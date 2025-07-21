import { sendRequest } from "../../services/menteeService";
import MentorCard from "./MentorCard";
import { useUser } from "../../contexts/UserContext";
import { useState } from 'react';

export default function MentorList({ setPendingRequests, mentors, setMentors }) {
    const [error, setError] = useState("");
    const { user } = useUser();

    const handleConnect = async (mentorId) => {
        try {
            const newRequest = await sendRequest(user.id, mentorId);
            setPendingRequests(prev => [...prev, newRequest]);
            setMentors(mentors.filter(mentor => mentor.id !== mentorId));
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            {error &&
                <ErrorModal error={error} setError={setError} />
            }
            <div className="list-container">
                {mentors.map(mentor => (
                    <MentorCard
                        key={mentor.id}
                        mentor={mentor}
                        onConnect={() => handleConnect(mentor.id)}
                    />
                ))}
            </div>
        </div>
    )
}