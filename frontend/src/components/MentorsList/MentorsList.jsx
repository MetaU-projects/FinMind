
import MentorCard from "./MentorCard";

export default function MentorList({ mentors, onSelect, onRequest, loadingMentor }) {

    const handleConnect = (mentorId) => {
        onRequest(mentorId)
    }

    return (
        <div className="mentors-container">
            {mentors.map(mentor => (
                <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onConnect={() => handleConnect(mentor.id)}
                    onSelect={onSelect}
                    loadingMentor={loadingMentor}
                />
            ))}
        </div>
    )
}