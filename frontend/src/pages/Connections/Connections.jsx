import ConnectionList from "../../components/ConnectionsList/ConnectionList";
import Header from "../../components/Header/Header";
import "./Connections.css"

export default function Connections() {
    return (
        <div>
            <Header />
            <h2 className="connections-count">20 Connections</h2>
            <div className="connections-page">
                <div className="connections-left">
                    <ConnectionList />
                </div>
            </div>
        </div>
    )
}