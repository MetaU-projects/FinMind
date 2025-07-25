import { removeRequest } from "../../services/menteeService";
import "./MenteeHome.css"

export default function PendingRequests({ pendingRequests, setPendingRequests, setMentors }) {

    const handleCancel = async (requestId, mentor) => {
        await removeRequest(requestId);
        setPendingRequests(pendingRequests.filter(pending => pending.id !== requestId));
        setMentors(prev => [mentor, ...prev]);
    }

    return (
        <div className="side-container">
            <h2 className="side-header">Pending Requests</h2>
            <ul className="side-list">
                {pendingRequests.length !== 0 ? (pendingRequests.map((pending) => (
                    <li key={pending.mentor.id} className="side-item">
                        <div>
                            <h5>{pending.mentor.name}</h5>
                            <p>You requested to connect</p>
                        </div>
                        <button onClick={() => handleCancel(pending.id, pending.mentor)} className="cancel-btn">Cancel</button>
                    </li>
                ))) : (
                    <div className="side-empty">No pending request</div>
                )}
            </ul>
        </div>
    )
}