import { getAvailableMentors } from "../../services/menteeService"
import MentorCard from "./MentorCard";
import { useEffect, useState } from "react";

export default function MentorList() {
    const [mentors, setMentors] = useState([]);
    
    useEffect(() => {
        const fetchMentors = async() => {
        const results = await getAvailableMentors();
        setMentors(results);
    }
        fetchMentors();
    }, [])

    return (
        <div className="list-container">
            {mentors.map(mentor => (
                <MentorCard
                key={mentor.id}
                mentor={mentor}
                />
            ))}
        </div>
    )
}