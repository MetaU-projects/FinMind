import { useState } from "react"
import { loginUser } from "../../services/dataService"
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = await loginUser(email, password);
        setUser(data.user);
        navigate(data.user.role === 'MENTOR' ? '/mentor/home' : '/mentee/home');
    }

    return (
        <div>
            <h2>Sign In</h2>
            <form id="login-form" onSubmit={handleLogin}>
                <label>School Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </label>
                <label>Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>
                <button type="submit">Sign In</button>
            </form>
            <p>Do not have an account?<Link to="/auth/signup">Sign Up</Link></p> 
        </div>
    );
}