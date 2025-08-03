import { MdOutlinePending } from "react-icons/md"; 
import { MdOutlineRecommend } from "react-icons/md"; 
import { logoutUser } from "../../services/dataService"
import { useUser } from "../../contexts/UserContext"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import "./Header.css"

export default function Header({ togglePanel }) {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

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
                    {currentPath === "/mentee/home" && user?.role === "MENTEE" ? (
                    <div className="header-actions">
                        <div className="flex items-center text-sm cursor-pointer" onClick={() => togglePanel('pending')}><MdOutlinePending className="header-icon"/>Pending</div>
                        <div className="flex items-center text-sm cursor-pointer" onClick={() => togglePanel('recommended')}><MdOutlineRecommend className="header-icon"/>Recommendations</div>
                        <button className="header-log" onClick={handlelogout}>Logout</button>
                    </div>
                ) : (
                    <button className="header-log" onClick={handlelogout}>Logout</button>
                )}
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