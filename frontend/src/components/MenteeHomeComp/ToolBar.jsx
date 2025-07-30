import { FaTimes } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import "./MenteeHome.css"
import { useUser } from "../../contexts/UserContext"

export default function ToolBar({ searchQuery, setSearchQuery, getData, onSearch }) {
    const { user } = useUser();
    const handleSearch = () => {
        if (searchQuery) {
            onSearch(searchQuery);
        }
    }
    const handleClear = async () => {
        setSearchQuery("");
        onSearch("");
        getData();
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (searchQuery) {
                setSearchQuery(searchQuery.trim());
                onSearch(searchQuery.trim());
            }
        }
    };
    return (
        <div className="banner">
            <div className="tool-quote">
                <h2>Discover Your Next Mentor</h2>
                <p>Hi {user.name}, this is your chance to connect with mentors that match your interests.</p>
            </div>
            <div className="search-bar">
                <input className="tool-search"
                    type="text"
                    value={searchQuery}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for mentors by 'name', 'major', 'school', 'interest' " />
                <button onClick={handleSearch} className="search-icon"><BiSearchAlt /></button>
                <button onClick={handleClear} className="search-icon right-0"><FaTimes /></button>
            </div>
        </div>
    )
}