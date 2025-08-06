import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../../services/dataService";
import { useUser } from "../../contexts/UserContext";
import { searchSchool } from "../../services/apiClient";
import "./SignUp.css"
import img1 from "../../assets/login-img1.jpg";
import img2 from "../../assets/login-img2.jpg";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import InterestSearch from "../../components/SignupComp/InterestSearch";
import { Role } from "../../utils/status";
import AvailabilityInput from "../../components/SignupComp/AvailabilityInput";
import { toast } from "react-hot-toast";

export default function SignUp() {
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");
    const [classification, setClassification] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [availability, setAvailability] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    const [school, setSchool] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [schoolResult, setSchoolResults] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);
    const [interestIds, setInterestIds] = useState([]);
    const [role, setRole] = useState("");
    const [step, setStep] = useState(1);

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

        if(password !== confirmPass) {
            alert("Passwords do not match");
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
            toast.success("Successfully signed up!");
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
            <div className="signup-container">
                <img src={img1} alt="top left image" className="top-img" />
                
                <div className="signup-form">
                    <div className="animate-container" style={{ transform: `translateX(-${(step - 1)*100}%)` }}>
                        
                    <div className="animate-form">
                    {step === 1 && (
                        <form className="step-form">
                            <h3 className="section-title">Personal Information</h3>
                            <input className="step-form-input" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <input className="step-form-input" type="email" placeholder="School Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <div className="relative w-full">
                                <input className="step-form-input w-full pr-10" type={showPassword ? "text" : "password"} placeholder="Password must be at least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <button type="button" className="absolute right-2 top-1/4" onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </button>
                            </div>
                            <div className="relative w-full">
                                <input className="step-form-input w-full pr-10" type={showPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required />
                                <button type="button" className="absolute right-2 top-1/4" onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </button>
                            </div>
                            <div className="role-buttons">
                                <button type="button" onClick={() => setRole(Role.MENTEE)} className={`role-btn ${role === Role.MENTEE ? 'bg-[#3D52A0] text-white' : 'bg-gray-200'}`}>Mentee</button>
                                <button type="button" onClick={() => setRole(Role.MENTOR)} className={`role-btn ${role === Role.MENTOR ? 'bg-[#3D52A0] text-white' : 'bg-gray-200'}`}>Mentor</button>
                            </div>
                        </form>
                    )}
                    </div>
                    <div className="animate-form">
                    {step === 2 && (
                        <form className="step-form">
                            <h3 className="section-title">Academic Details</h3>
                            <input className="step-form-input" type="text" placeholder="Search your school..." value={selectedSchool} onChange={(e) => handleSearch(e)} required />
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
                            <input className="step-form-input" type="text" placeholder="Enter your major" value={major} onChange={(e) => setMajor(e.target.value)} required />
                            <select className="classification" value={classification} onChange={(e) => setClassification(e.target.value)} required>
                                <option value="">Select your classification</option>
                                <option value="Freshman">Freshman</option>
                                <option value="Sophomore">Sophomore</option>
                                <option value="Junior">Junior</option>
                                <option value="Senior">Senior</option>
                            </select>
                        </form>
                    )}
                    </div>
                    <div className="animate-form">
                    {step === 3 && (
                        <form className="step-form">
                            <h3 className="section-title">Tell Us About Yourself</h3>
                            <textarea placeholder="Share a brief overview of your background, aspirations, and what you hope to gain from mentorship"
                                maxLength="255" rows="3" value={bio} onChange={(e) => setBio(e.target.value)} required>
                            </textarea>
                            <InterestSearch onSelect={(ids) => setInterestIds(ids)} />
                            <AvailabilityInput onChange={(availabilityData) => setAvailability(availabilityData)} />
                        </form>
                    )}
                    </div>
                    </div>

                    <div className="form-actions">
                        {step > 1 && <button className="form-btn" onClick={() => setStep(step - 1)}>Back</button>}
                        {step < 3 && <button className="form-btn" onClick={() => setStep(step + 1)}>Next</button>}
                        {step === 3 && <button className="form-btn" onClick={handleSignUp}>Create An Account</button>}
                    </div>
                    <div className="bottom-content">
                        <p>Already have an account? <Link className="link" to="/auth/login">Sign In</Link></p>
                    </div>
                </div>
                <img src={img2} alt="Bottom right image" className="bottom-img" />
            </div>
        </div>
    );
}