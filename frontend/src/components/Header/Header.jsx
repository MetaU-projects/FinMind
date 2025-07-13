import { logoutUser } from "../../services/dataService"
import { useUser } from "../../contexts/UserContext"
import { Link, useNavigate } from 'react-router-dom'
import "./Header.css"

export default function Header() {
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
                    <button className="header-action" onClick={handlelogout}>Logout</button>
                </div>
            ) : (
                <div className="header-wrapper">
                    <h1>MentorMe</h1>
                    <Link className="header-action" to="/auth/login">Login</Link>
                </div>
            )
            }
        </header>
    )
}