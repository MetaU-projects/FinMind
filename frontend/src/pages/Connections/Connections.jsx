import { getAllConnections } from "../../services/mentorshipService";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import ConnectionList from "../../components/ConnectionsList/ConnectionList";
import Header from "../../components/Header/Header";
import "./Connections.css"

export default function Connections() {
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
        <div className="page-wrapper">
            <Header />
            <h2 className="connections-count">{connections.length} Connections</h2>
            <div className="connections-content">
                <div className="connections-left">
                    <ConnectionList connections={connections} role={user.role} />
                </div>
            </div>
        </div>
    )
}