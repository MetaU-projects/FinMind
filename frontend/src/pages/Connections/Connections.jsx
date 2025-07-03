import ConnectionList from "../../components/ConnectionsList/ConnectionList";
import Header from "../../components/Header/Header";
import "./Connections.css"

export default function Connections() {
    return (
        <div className="page-wrapper">
            <Header />
            <h2 className="connections-count">20 Connections</h2>
            <div className="connections-content">
                <div className="connections-left">
                    <ConnectionList />
                </div>
            </div>
        </div>
    )
}