import ConnectionCard from "./ConnectionCard";
import "./ConnectionList.css"

export default function ConnectionList({ connections, role }) {


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