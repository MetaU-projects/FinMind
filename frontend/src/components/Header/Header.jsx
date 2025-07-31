import { MdOutlineRecommend } from "react-icons/md"; 
import { IoMdNotifications } from "react-icons/io";
import { logoutUser } from "../../services/dataService"
import { useUser } from "../../contexts/UserContext"
import { Link, useNavigate } from 'react-router-dom'
import "./Header.css"

export default function Header({ togglePanel }) {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handlelogout = async () => {
        await logoutUser();
        setUser(null);
        navigate('/');
    }

    return (
        <header>
            {user ? (
                <div className="header-wrapper">
                    <Link to='/'><h1>MentorMe</h1></Link>
                    <nav className="nav-links">
                        <Link className="nav-link" to={user.role === 'MENTOR' ? '/mentor/home' : '/mentee/home'}> Home </Link>
                        <Link className="nav-link" to='/connections'>Connections</Link>
                    </nav>
                    <div className="header-actions">
                        <IoMdNotifications className="header-icon" onClick={() => togglePanel('pending')} />
                        <MdOutlineRecommend className="header-icon" onClick={() => togglePanel('recommended')} />
                        <button className="header-log" onClick={handlelogout}>Logout</button>
                    </div>
                </div>
            ) : (
                <div className="header-wrapper">
                    <h1>MentorMe</h1>
                    <Link className="header-log" to="/auth/login">Login</Link>
                </div>
            )
            }
        </header>
    )
}