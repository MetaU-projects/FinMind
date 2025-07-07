import { sendRequest } from "../../services/menteeService"
import MentorCard from "./MentorCard";
import { useUser } from "../../contexts/UserContext";

export default function MentorList({ setPendingRequests, mentors, setMentors }) {
    const { user } = useUser();

    const handleConnect = async (mentorId) => {
        try {
            const newRequest = await sendRequest(user.id, mentorId);
            setPendingRequests(prev => [...prev, newRequest]);
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