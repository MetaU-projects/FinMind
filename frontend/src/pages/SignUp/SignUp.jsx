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

    const { setUser } = useUser();

    const navigate = useNavigate();
    const { state } = useLocation();
    const role = state?.role;

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(
                name,
                email,
                password,
                role,
                school,
                major,
                classification,
                description,
                bio,
                availability);

            setUser(data);
            navigate('/auth/login');
        } catch (err) {
            console.error("Network error: ", err);
        }
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form id='register-form' onSubmit={handleSignUp}>
                <label>Full Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </label>
                <label>University/College
                    <input
                        type="text"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        required />
                </label>
                <div>
                    <label>Major
                        <input
                            type="text"
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                            required />
                    </label>
                    <label>Classification
                        <select id="class" value={classification} onChange={(e) => setClassification(e.target.value)} required>
                            <option value="">Choose one</option>
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>School Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </label>
                    <label>Availability(Days)
                        <input
                            type="text"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            required />
                    </label>
                </div>
                <label>Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>
                <div>
                    <label>Bio
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required />
                    </label>
                    <label>Description
                        <input
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            required />
                    </label>
                </div>
                <button type="submit">Create an Account</button>
            </form>
            <p>Already have an account? <Link to="/auth/login">Sign In</Link></p>
        </div>
    );
}