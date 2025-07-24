import { Link, useNavigate } from 'react-router-dom';
import "./Footer.css";

export default function Footer() {
    return (
        <footer className='footer-container'>
            <div className='footer-content'>
                <p className='copyright'>&copy; {new Date().getFullYear()} MentorMe. All right reserved.</p>
                <div className='footer-links'>
                    <Link to="/" smooth duration={500} className='link-text'>Terms & Conditions</Link>
                    <Link to="/" smooth duration={500} className='link-text'>Privacy</Link>
                </div>
            </div>
        </footer>
    )
}