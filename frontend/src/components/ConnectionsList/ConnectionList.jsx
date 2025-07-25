import ConnectionCard from "./ConnectionCard";
import { endMentorship } from "../../services/mentorshipService";
import "./ConnectionList.css"
import { useState } from "react";
import ErrorModal from "../ErrorModal/ErrorModal";

export default function ConnectionList({ connections, setConnections, role, onSelect }) {
    const [error, setError] = useState("")

    const handleEnd = async (connectionId) => {
        try {
            await endMentorship(connectionId);
            setConnections(connections.filter(connection => connection.id !== connectionId));
        } catch (err) {
            setError("Error ending connection");
        }
    }

    return (
        <div>
            {error && <ErrorModal error={error} setError={setError} />}
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
        </div>
    )
}