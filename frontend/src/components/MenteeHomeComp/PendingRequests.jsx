import { removeRequest } from "../../services/menteeService";
import "./MenteeHome.css"

export default function PendingRequests({ pendingRequests, setPendingRequests, setMentors }) {

    const handleCancel = async (requestId, mentor) => {
        await removeRequest(requestId);
        setPendingRequests(pendingRequests.filter(pending => pending.id !== requestId));
        setMentors(prev => [mentor, ...prev]);
    }

    return (
        <div className="pending-requests">
            <h2 className="pending-header">Pending Requests</h2>
            <ul className="pending-list">
                {pendingRequests.map((pending) => (
                    <li key={pending.mentor.id} className="pending-item">
                        <div>
                            <h5>{pending.mentor.name}</h5>
                            <p>You requested to connect</p>
                        </div>
                        <button onClick={() => handleCancel(pending.id, pending.mentor)} className="cancel-btn">Cancel</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}