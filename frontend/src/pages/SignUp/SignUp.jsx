import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { registerUser } from "../../services/dataService";
import { useUser } from "../../contexts/UserContext";
import { searchSchool } from "../../services/apiClient";
import "./SignUp.css"
import logo from "../../assets/logo.png"
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import InterestSearch from "../../components/SignupComp/InterestSearch";
import { Role } from "../../utils/status";
import AvailabilityInput from "../../components/SignupComp/AvailabilityInput";

export default function SignUp() {
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");
    const [classification, setClassification] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [availability, setAvailability] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    const [school, setSchool] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [schoolResult, setSchoolResults] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);
    const [interestIds, setInterestIds] = useState([])
    const [role, setRole] = useState("")

    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        setSelectedSchool(e.target.value)
        try {
            const data = await searchSchool(e.target.value);
            setSchoolResults(data);
            if (data) {
                setShowDropDown(true);
            }
            else {
                setError("No available match");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const isValid = availability.every(({ startTime, endTime }) => {
            return startTime < endTime;
        });
        if (!isValid) {
            setError("End time must be after start time for all days.")
            return;
        }
        try {
            const data = await registerUser({
                name,
                email,
                password,
                role,
                school,
                major,
                classification,
                bio,
                availability,
                interestIds
            });
            setUser(data);
            navigate('/auth/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            {error && <ErrorModal
                error={error}
                setError={setError} />
            }
            <div className="signup">
                <div className="left-side">
                    <img src={logo} />
                    <h2>Create An Account</h2>
                    <p>Join our community and start your jouney towards growth and success</p>
                    <h3>Choose your role</h3>
                    <div className="role-pick">
                        <button className="role" onClick={() => setRole(Role.MENTEE)}>Mentee</button>
                        <button className="role" onClick={() => setRole(Role.MENTOR)}>Mentor</button>
                    </div>
                </div>

                <form onSubmit={handleSignUp} className="sign-up-form">
                    <h3 className="first-section">Personal Information</h3>
                    <div className="content">
                        <label>Full Name
                            <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                        </label>
                        <label>School Email
                            <input type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </label>
                    </div>

                    <label>Password
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>

                    <h3 className="section-title">Academic Details</h3>
                    <div>
                        <label>University/College
                            <input type="text" placeholder="Search your school..." value={selectedSchool} onChange={(e) => handleSearch(e)} required />
                        </label>

                        <div className="relative">
                            {showDropDown && selectedSchool &&
                                <div className="search-drop">
                                    {schoolResult.length !== 0 ? schoolResult.map((school, index) => (
                                        <div
                                            className="school"
                                            key={index}
                                            onClick={() => { setSchool(school.school.name); setShowDropDown(false); setSelectedSchool(school.school.name) }}
                                        >{school.school.name}</div>
                                    )) : (
                                        <div className="school">No search results!</div>
                                    )} </div>
                            }
                        </div>

                        <div className="content">
                            <label>Major
                                <input type="text" placeholder="Enter your major" value={major} onChange={(e) => setMajor(e.target.value)} required />
                            </label>

                            <label>Classification
                                <select value={classification} onChange={(e) => setClassification(e.target.value)} required>
                                    <option value="">Select your classification</option>
                                    <option value="Freshman">Freshman</option>
                                    <option value="Sophomore">Sophomore</option>
                                    <option value="Junior">Junior</option>
                                    <option value="Senior">Senior</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <h3 className="section-title">Tell Us About Yourself</h3>
                    <div>
                        <label>Short Bio
                            <textarea placeholder="Share a brief overview of your background, aspirations, and what you hope to gain from mentorship"
                                maxLength="255" rows="3" value={bio} onChange={(e) => setBio(e.target.value)} required>
                            </textarea>
                        </label>


                        <div>
                            <label>Interest & Experience</label>
                            <InterestSearch onSelect={(ids) => setInterestIds(ids)} />
                        </div>

                        <label>Availability </label>
                        <AvailabilityInput onChange={(availabilityData) => setAvailability(availabilityData)} />
                    </div>
                    <button className="btn-submit" type="submit">Create an Account</button>
                    <div className="bottom-content">
                        <p>Already have an account? <Link className="link" to="/auth/login">Sign In</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}