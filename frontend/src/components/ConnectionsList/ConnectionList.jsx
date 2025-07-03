import ConnectionCard from "./ConnectionCard";
import { getAllConnections } from "../../services/mentorshipService";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";

export default function ConnectionList() {
    const [connections, setConnections] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchConnections = async () => {
            const results = await getAllConnections(user.role);
            setConnections(results);
        }
        fetchConnections();
    }, [])


    return (
        <div className="list-container">
            {connections.map(connection => {
                const connectionUser = user.role === "MENTEE" ? connection.mentor : connection.mentee;
                return (
                    <ConnectionCard
                        key={connectionUser.id}
                        person={connectionUser}
                    />
                );
            })}
        </div>
    )
}