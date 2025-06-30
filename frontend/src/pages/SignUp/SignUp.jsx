import { BiPlus } from "react-icons/bi";
import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { registerUser } from "../../services/dataService";
import { useUser } from "../../contexts/UserContext";

export default function SignUp() {
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");
    const [classification, setClassification] = useState("");
    const [email, setEmail] = useState("");
    const [school, setSchool] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [availability, setAvailability] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");

    const { setUser } = useUser();

    const navigate = useNavigate();
    const { state } = useLocation();
    const role = state?.role;

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
                description,
                bio,
                availability
            });

            setUser(data);
            navigate('/auth/login');
        } catch (err) {
            setError(err.message || "Error occured signing you in. Try again!");
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-l from-[#EDE8F5] via-[#EDE8F5] to-[#ADBBDA]">
            {error && <div className="error">{error}</div>}
            <div className="w-1/3 bg-gray-100 flex flex-col justify-center p-6">
                <h1 className="text-2xl font-bold mb-1">MentorMe</h1>
                <h2 className="text-3xl font-bold mb-4">Create An Account</h2>
                <p className="text-gray-600">Join our community and start your jouney towards growth and success</p>
            </div>

            <form className="w-2/3 flex flex-col justify-center px-16 py-5" onSubmit={handleSignUp}>

                <h3 className="text-xl font-bold mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <label className="block mb-1 font-medium">Full Name
                        <input
                            type="text"
                            className="w-full rounded px-2 py-1 text-sm shadow-lg"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />
                    </label>
                    <label className="block mb-1 font-medium">School Email
                        <input
                            type="text"
                            className="w-full rounded px-2 py-1 text-sm shadow-xl"
                            placeholder="john.doe@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </label>
                </div>
                <div className="mt-4">
                    <label className="block mb-1 font-medium">Password
                        <input
                            type="password"
                            className="w-full rounded px-2 py-1 text-sm shadow-xl"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </label>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-3">Academic Details</h3>
                <div>
                    <label className="block mb-1 font-medium">University/College
                        <input
                            type="text"
                            className="w-full rounded px-2 py-1 text-sm shadow-xl"
                            placeholder="Search your school..."
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                            required />
                    </label>
                    <div className=" mt-4 grid grid-cols-2 gap-4">
                        <label className="block mb-1 font-medium">Major
                            <input
                                type="text"
                                className="w-full rounded px-2 py-1 text-sm shadow-xl"
                                placeholder="Enter your major"
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                                required />
                        </label>

                        <label className="block mb-1 font-medium">Classification
                            <select className="w-full rounded px-2 py-1 text-sm shadow-xl"
                                value={classification} onChange={(e) => setClassification(e.target.value)}
                                required>
                                <option value="">Select your classification</option>
                                <option value="Freshman">Freshman</option>
                                <option value="Sophomore">Sophomore</option>
                                <option value="Junior">Junior</option>
                                <option value="Senior">Senior</option>
                            </select>
                        </label>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-3">Tell Us About Yourself</h3>
                <div>
                    <label className="block mb-1 font-medium">Short Bio
                        <textarea
                            className="w-full rounded px-2 py-1 text-sm shadow-xl"
                            placeholder="Share a brief overview of your background, aspirations, and what you hope to gain from mentorship"
                            maxLength="255" rows="3"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            required></textarea>
                    </label>
                    <div className="mt-4">
                        <label className="block mb-1 font-medium">Interest & Experience
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    className="w-full rounded px-2 py-1 text-sm shadow-xl"
                                    placeholder="Add custom interest or skill (e.g. Python, Leadership)"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required />
                                <button className="bg-gray-300 px-3 py-2 rounded"><BiPlus /></button>
                            </div>
                        </label>
                        <p className="text-gray-500 font-medium">Choose from popular skills</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer">Data Science <span className="text-sm">&times;</span></span>
                            <span className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer">UI/UX Design <span className="text-sm">&times;</span></span>
                            <span className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer">Public Relations <span className="text-sm">&times;</span></span>
                            <span className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer">Software Development <span className="text-sm">&times;</span></span>
                            <span className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer">Technical Interview <span className="text-sm">&times;</span></span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <label className="block mb-1 font-medium">Availability(Days)
                            <input
                                type="text"
                                className="w-full rounded px-2 py-1 text-sm shadow-xl"
                                value={availability}
                                onChange={(e) => setAvailability(e.target.value)}
                                required />
                        </label>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer">Monday </span>
                            <span className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer">Tuesday</span>
                            <span className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer">Wednesday</span>
                            <span className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer">Thursday</span>
                            <span className="bg-[#8697C4] text-white px-3 py-1 rounded-full cursor-pointer">Friday</span>
                        </div>
                    </div>
                </div>
                <button className="font-medium bg-[#7091E6] px-6 py-3 rounded mt-8 hover:bg-[#3D52A0] hover:text-white hover:cursor-pointer" type="submit">Create an Account</button>
                <p className="mt-4 text-gray-600">Already have an account? <Link className="font-medium text-[#3D52A0]" to="/auth/login">Sign In</Link></p>
            </form>
        </div>
    );
}