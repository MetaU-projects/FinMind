import { ImSpinner8 } from "react-icons/im";
import { useState } from "react";
import { loginUser } from "../../services/dataService";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import './Login.css';
import img1 from "../../assets/login-img1.jpg";
import img2 from "../../assets/login-img2.jpg";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await loginUser(email, password);
            setUser(data.user);
            navigate(data.user.role === 'MENTOR' ? '/mentor/home' : '/mentee/home');
            toast.success("Successfully logged in!");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {error &&
                <ErrorModal
                    error={error}
                    setError={setError}
                />
            }
            <div className="signIn">
                <img src={img1} alt="top left image" className="top-img" />
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="top-content">
                        <h2>Welcome to MentorMe</h2>
                        <p>Sign in to your account to continue your mentorship journey</p>
                    </div>
                    <label> School Email
                        <input
                            type="text"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </label>
                    <label className="relative">Password
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <button type="button" className="absolute right-2 top-3/4" onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </label>
                    <button className="login-btn" disabled={loading} type="submit">{loading ? <ImSpinner8 className="animate-spin" /> : "Sign In"}</button>
                    <div className="bottom-content">
                        <p className="link-text">Do not have an account? <Link className="link" to="/auth/signup">Sign Up</Link></p>
                    </div>
                </form>

                <img src={img2} alt="Bottom right image" className="bottom-img" />
            </div>
        </div>
    );

}