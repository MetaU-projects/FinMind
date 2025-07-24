import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header";
import './WelcomePage.css'
import Footer from "../../components/Footer/Footer";

export default function WelcomePage() {
    const navigate = useNavigate();
    const go = role => navigate('/auth/signup', { state: { role } });
    return (
        <div className="pg-wrapper">
            <Header />
            <section className="top-section">
                <h2>Connect, Grow, Thrive: <br />Your Mentorship <br />Journey Starts Here</h2>
                <p>MentorMe bridges the gap between aspiring individuals and experience professionals.
                    Whether you're seeking guidance or ready to share your wisdom, our platform provides
                    the perfect environment for growth and success.
                </p>
                <div className="role-btn">
                    <button className="mentor" onClick={() => go('mentor')}>Become a Mentor</button>
                    <button className="mentee" onClick={() => go('mentee')}>Become a Mentee</button>
                </div>
            </section>

            <section className="about">
                <h3>How MentorMe Works</h3>
                <div className="info-cards">
                    <div className="info-card">
                        <h4>Find Your Perfect Match</h4>
                        <p>Our intelligent matching system connects you with
                            mentors or mentees based on your goals, skills, and preferences
                        </p>
                    </div>
                    <div className="info-card">
                        <h4>Accelerate Your Growth</h4>
                        <p>Gain invaluable insights, learn new skills, and navigate your career
                            path with personalized guidance from your peers
                        </p>
                    </div>
                    <div className="info-card">
                        <h4>Make a Lasting Impact</h4>
                        <p>Share your expertise, inspire your peers, and contribute
                            to a vibrant community of learners and leaders
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}