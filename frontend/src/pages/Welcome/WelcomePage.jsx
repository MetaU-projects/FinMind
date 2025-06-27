import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header";

export default function WelcomePage() {
    const navigate = useNavigate();
    const go = role => navigate('/auth/signup', {state: {role} });
    return (
        <div>
            <Header />
            <h1>Welcome to MentorMe</h1>
            <h2>Get Started!</h2>
            <button onClick={() => go('mentor')}>Mentor</button>
            <button onClick={() => go('mentee')}>Mentee</button>
        </div>
    );
}