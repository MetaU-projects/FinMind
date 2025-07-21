import ConnectionCard from "./ConnectionCard";
import { endMentorship } from "../../services/mentorshipService";
import "./ConnectionList.css"

export default function ConnectionList({ connections, setConnections, role, onSelect }) {

    const handleEnd = async (connectionId) => {
        try {
            await endMentorship(connectionId);
            setConnections(connections.filter(connection => connection.id !== connectionId));
        } catch (err) {
            console.error("Error ending connection");
        }
    }

    return (
        <div className="list-container">
            {connections.map(connection => {
                const connectionUser = role === "MENTEE" ? connection.mentor : connection.mentee;
                return (
                    <ConnectionCard
                        key={connectionUser.id}
                        person={connectionUser}
                        endConnection={() => handleEnd(connection.id)}
                        connection={connection}
                        onSelect={onSelect}
                    />
                );
            })}
        </div>
    )
}