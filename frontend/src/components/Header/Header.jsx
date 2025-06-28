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
        <nav>
            {user ? (
                <div>
                    <h2>Welcome</h2>
                    <button onClick={handlelogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <Link to="/auth/login">Login</Link>
                </div>
            )
            }
        </nav>
    )
}