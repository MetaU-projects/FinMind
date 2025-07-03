import { getAvailableMentors, sendRequest } from "../../services/menteeService"
import MentorCard from "./MentorCard";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";

export default function MentorList() {
    const [mentors, setMentors] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchMentors = async () => {
            const results = await getAvailableMentors();
            setMentors(results);
        }
        fetchMentors();
    }, [])

    const handleConnect = async (mentorId) => {
        try {
            await sendRequest(user.id, mentorId);
            setMentors(mentors.filter(mentor => mentor.id !== mentorId));
        } catch (err) {
            console.error("Error sending request");
        }
    }

    return (
        <div className="list-container">
            {mentors.map(mentor => (
                <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onConnect={() => handleConnect(mentor.id)}
                />
            ))}
        </div>
    )
}