import "./MenteeHome.css"
import { useState } from "react";
import { useUser } from "../../contexts/UserContext"

export default function ToolBar() {
    const { user } = useUser();
    const [selfilter, setSelFilter] = useState("");

    return (
        <div>
            <div className="tool-top">
                <div className="tool-top-left">
                    <h2>Discover Your Next Mentor</h2>
                    <p>Hi {user.role}, this is your chance to connect with mentors that match your interests.</p>
                </div>
                <input type="text" placeholder="Search for mentors by name" />
            </div>
            <div className="tool-bottom">
                {['All', 'Available Now', 'Internship', 'Major', 'School'].map((filter) => (
                    <button type="button" onClick={()=>setSelFilter(filter)}
                    className={`${selfilter.includes(filter) ? 'selected' : 'unselected'}`}>
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    )
}