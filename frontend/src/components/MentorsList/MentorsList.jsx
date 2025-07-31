
import MentorCard from "./MentorCard";

export default function MentorList({ setPendingRequests, mentors, setMentors, onSelect, onRequest, onSendRequest }) {

    const handleConnect = (mentorId) => {
        onRequest(mentorId)
        onSendRequest()
    }

    return (
        <div className="mentors-container">
            {mentors.map(mentor => (
                <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onConnect={() => handleConnect(mentor.id)}
                    onSelect={onSelect}
                />
            ))}
        </div>
    )
}