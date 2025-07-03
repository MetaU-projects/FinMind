import ConnectionCard from "./ConnectionCard";
import { getAllConnections } from "../../services/mentorshipService";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import "./ConnectionList.css"

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
            {user.role === "MENTEE" ? (
                (connections.map(connection => (
                    <ConnectionCard
                        key={connection.mentor.id}
                        person={connection.mentor}
                    />
                )))
            ) : (
                (connections.map(connection => (
                    <ConnectionCard
                        key={connection.mentee.id}
                        person={connection.mentee}
                    />
                )))
            )
            }
        </div>
    )
}