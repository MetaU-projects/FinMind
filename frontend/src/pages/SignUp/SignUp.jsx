import { BiPlus } from "react-icons/bi";
import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { registerUser } from "../../services/dataService";
import { useUser } from "../../contexts/UserContext";
import "./SignUp.css"
import logo from "../../assets/logo.png"

export default function SignUp() {
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");
    const [classification, setClassification] = useState("");
    const [email, setEmail] = useState("");
    const [school, setSchool] = useState("");
    const [password, setPassword] = useState("");
    const [availability, setAvailability] = useState("");
    const [bio, setBio] = useState("");
    const [interests, setInterests] = useState([]);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const { setUser } = useUser();
    const navigate = useNavigate();
    const { state } = useLocation();
    const role = state?.role;

    const popularSkills = [
        'Data Science',
        'Public Relations',
        'UI/UX Design',
        'Technical Interview'
    ]

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
            setError("Error occured creating an account. Try again!");
        }
    };

    return (
        <div className="signup">
            {error && <div className="error">{error}</div>}

            <div className="left-side">
                <img src={logo} />
                <h2 className="text-3xl font-bold mb-4">Create An Account</h2>
                <p className="text-gray-600">
                    Join our community and start your jouney towards growth and success
                </p>
            </div>

            <form onSubmit={handleSignUp}>

                <h3 className="text-xl font-bold mb-3">Personal Information</h3>
                <div className="content">
                    <label>Full Name
                        <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>School Email
                        <input type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                </div>
                <div className="mt-4">
                    <label>Password
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                </div>

                <h3 className="section-title">Academic Details</h3>
                <div>
                    <label>University/College
                        <input type="text" placeholder="Search your school..." value={school} onChange={(e) => setSchool(e.target.value)} required />
                    </label>
                    <div className="mt-4 content">
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

                    <div className="mt-4">
                        <label>Interest & Experience</label>
                        <div className="flex gap-2 mb-2">
                            <input type="text" placeholder="Add custom interest or skill (e.g. Python, Leadership)"
                                value={description} onChange={(e) => setDescription(e.target.value)}
                            />
                            <button type="button"
                                className="border rounded px-2 py-1 text-sm shadow-xl"
                                onClick={() => {
                                    if (description && !interests.includes(description)) {
                                        setInterests([...interests, description]);
                                        setDescription('');
                                    }
                                }}>
                                <BiPlus />
                            </button>
                        </div>

                        <p className="text-gray-500 font-medium">Choose from popular skills</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {popularSkills.map((tag) => (
                                <span
                                    key={tag}
                                    onClick={() => {
                                        if (!interests.includes(tag)) {
                                            setInterests([...interests, tag]);
                                        }
                                    }}
                                    className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer hover:bg-[#ADBBDA]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        {interests.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {interests.map((interest) => (
                                    <div key={interest}
                                        className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer">
                                        <span className="mr-2">{interest}</span>
                                        <button type="button"
                                            onClick={() => {
                                                setInterests(interests.filter((item) => item !== interest))
                                            }}
                                            className="text-white-500 font-bold cursor-pointer hover:text-gray-700"
                                        >&times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                    <label>Availability(Days) </label>
                    <div className=" flex gap-2 flex-wrap items-center">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                            <button
                                type="button"
                                key={day}
                                onClick={() => setAvailability((prev) =>
                                    prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
                                )
                                }
                                className={`avail ${availability.includes(day) ?
                                    'bg-[#8697C4] text-white px-3 py-1 rounded-full' : 'bg-white border-gray-300'}`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>
                <button className="btn-submit" type="submit">Create an Account</button>
                <p className="mt-4 text-gray-600">Already have an account? <Link className="font-medium text-[#3D52A0]" to="/auth/login">Sign In</Link></p>
            </form>
        </div>
    );
}