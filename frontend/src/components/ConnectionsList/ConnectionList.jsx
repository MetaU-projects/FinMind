import ConnectionCard from "./ConnectionCard";
import "./ConnectionList.css"

export default function ConnectionList({ connections, role }) {


    return (
        <div className="list-container">
            {role === "MENTEE" ? (
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