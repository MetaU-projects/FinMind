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
        <header>
            {user ? (
                <div className="relative flex items-center justify-between px-6 py-4 shadow-md" style={{ backgroundColor: '#ADBBDA' }}>
                    <h2 className="text-xl font-bold text-white">MentorMe</h2>
                    <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
                        <Link className="relative text-white font-thin after:block after:h-[2px] 
                        after:bg-white after:scale-x-0 after:transition-transform after:duration-300 
                        after:origin-left hover:after:scale-x-100 after:mt-1"
                            to={user.role === 'MENTOR' ? '/mentor/home' : '/mentee/home'}>
                            Home
                        </Link>
                        <Link className="relative text-white font-thin after:block after:h-[2px] 
                        after:bg-white after:scale-x-0 after:transition-transform after:duration-300 
                        after:origin-left hover:after:scale-x-100 after:mt-1"
                            to='/connections'>
                            Connections
                        </Link>
                    </nav>
                    <button className="bg-white text-[#3D52A0] px-2 rounded-xs hover:bg-[#3D52A0] hover:text-white"
                        onClick={handlelogout}>Logout</button>
                </div>
            ) : (
                <div className="relative flex items-center justify-between px-6 py-4 shadow-md" style={{ backgroundColor: '#ADBBDA' }}>
                    <h2 className="text-xl font-bold">MentorMe</h2>
                    <Link to="/auth/login">Login</Link>
                </div>
            )
            }
        </header>
    )
}