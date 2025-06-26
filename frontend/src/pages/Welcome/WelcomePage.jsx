import { useNavigate } from "react-router-dom"

export default function WelcomePage() {
    const navigate = useNavigate();
    const go = role => navigate('/auth/signup', {state: {role} });
    return (
        <div>
            <h1>Welcome to MentorMe</h1>
            <h2>Get Started!</h2>
            <button onClick={() => go('mentor')}>Mentor</button>
            <button onClick={() => go('mentee')}>Mentee</button>
        </div>
    );
}