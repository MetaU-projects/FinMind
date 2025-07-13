import "./MenteeHome.css"
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";

export default function ToolBar() {
    const [selfilter, setSelFilter] = useState("");
    const { user } = useUser();

    return (
        <div>
            <div className="banner">
                <div>
                    <div className="quote">
                        <h2>Discover Your Next Mentor</h2>
                        <p>Hi {user.name}, this is your chance to connect with mentors that match your interests.</p>
                    </div>
                </div>
                <input className="tool-search" type="text" placeholder="Search for mentors by name" />
                <div className="tool-bottom">
                    {['All', 'Available Now', 'Internship', 'Major', 'School'].map((filter) => (
                        <button type="button" onClick={() => setSelFilter(filter)}
                            className={`${selfilter.includes(filter) ? 'selected' : 'unselected'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
            </div>


        </div>

    )
}