import { logoutUser } from "../../services/dataService"
import { useUser } from "../../contexts/UserContext"
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handlelogout = async () => {
        await logoutUser();
        setUser(null);
        navigate('/');
    }

    return (
        <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
            {user ? (
                <div>
                    <h2 className="text-xl font-bold">MentorMe</h2>
                    <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
                        <Link to={user.role === 'MENTOR' ? '/mentor/home' : '/mentee/home'}>
                            Home
                        </Link>
                        <Link to='/connections'>Connections</Link>
                    </nav>
                    <button onClick={handlelogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-bold">MentorMe</h2>
                    <Link to="/auth/login">Login</Link>
                </div>
            )
            }
        </header>
    )
}