import { BiPlus } from "react-icons/bi";
import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { registerUser } from "../../services/dataService";
import { useUser } from "../../contexts/UserContext";
import { searchSchool } from "../../services/apiClient";
import "./SignUp.css"
import logo from "../../assets/logo.png"
import ErrorModal from "../../components/ErrorModal/ErrorModal";

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
    const [description, setDescription] = useState("");
    const [interests, setInterests] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState("");
    const [schoolResult, setSchoolResults] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);

    const { setUser } = useUser();
    const navigate = useNavigate();
    const { state } = useLocation();
    const role = state?.role;

    const popularSkills = ['Data Science', 'Public Relations', 'UI/UX Design', 'Technical Interview']

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
        try {
            const data = await registerUser({
                name,
                email,
                password,
                role,
                school,
                major,
                classification,
                interests,
                bio,
                availability
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
                </div>

                <form onSubmit={handleSignUp}>

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
                            <div className="interests-section">
                                <input type="text" placeholder="Add custom interest or skill (e.g. Python, Leadership)"
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                />
                                <button type="button"
                                    className="add-custom"
                                    onClick={() => {
                                        if (description && !interests.includes(description)) {
                                            setInterests([...interests, description]);
                                            setDescription('');
                                        }
                                    }}>
                                    <BiPlus />
                                </button>
                            </div>

                            <p>Choose from popular skills</p>
                            <div className="tags">
                                {popularSkills.map((tag) => (
                                    <span
                                        key={tag}
                                        onClick={() => {
                                            if (!interests.includes(tag)) {
                                                setInterests([...interests, tag]);
                                            }
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {interests.length > 0 && (
                                <div className="select-interest">
                                    {interests.map((interest) => (
                                        <div key={interest} className="selected">
                                            <span className="mr-2">{interest}</span>
                                            <button type="button"
                                                onClick={() => { setInterests(interests.filter((item) => item !== interest)) }}>
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <label>Availability(Days) </label>
                        <div className="days">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                                <button
                                    type="button"
                                    key={day}
                                    onClick={() => setAvailability((prev) =>
                                        prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day])}
                                    className={`avail ${availability.includes(day) ? 'unpicked' : 'picked'}`}>
                                    {day}
                                </button>
                            ))}
                        </div>
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