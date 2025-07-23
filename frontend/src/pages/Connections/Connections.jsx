import { BsPeople } from "react-icons/bs";
import { MdPeopleOutline } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { AiOutlineCalendar } from "react-icons/ai";
import { getAllConnections, getMeetingHistory, getUpcomingMeeting, suggestedSession } from "../../services/mentorshipService";
import { useCallback, useEffect, useState, useRef } from "react";
import { useUser } from "../../contexts/UserContext";
import ConnectionList from "../../components/ConnectionsList/ConnectionList";
import Header from "../../components/Header/Header";
import Meetings from "../../components/ConnectionsComp/Meetings";
import Schedule from "../../components/ConnectionsComp/Schedule";
import Tasks from "../../components/ConnectionsComp/Tasks";
import "./Connections.css"

export default function Connections() {
    const { user } = useUser();
    const [connections, setConnections] = useState([]);
    const tabs = ['Overview', 'Meetings', 'Tasks', 'Schedule'];
    const [activeTab, setActiveTab] = useState('Overview');
    const [selectedConnection, setSelectedConnection] = useState(null);
    const [upComing, setUpcoming] = useState([]);
    const [meetingHistory, setMeetingHistory] = useState([]);
    const [timeSuggestions, setTimeSuggestions] = useState([]);
    const role = user.role === "MENTEE" ? "mentor" : "mentee";

    useEffect(() => {
        const fetchConnections = async () => {
            const results = await getAllConnections(user.role);
            setConnections(results);
        }
        fetchConnections();
    }, [user.role])

    const lastSelectedRef = useRef(null);
    const handleSelect = useCallback(async (connection) => {
        lastSelectedRef.current = connection.id;
        setSelectedConnection(connection);
        console.log(connection)

        const [historyData, upComingData, sessionsData] = await Promise.all([
            getMeetingHistory(connection.id),
            getUpcomingMeeting(connection.id),
            suggestedSession(connection[role].id)
        ]);
        if (lastSelectedRef.current === connection.id) {
            setUpcoming(upComingData);
            setMeetingHistory(historyData);
            setTimeSuggestions(sessionsData);
        }
    }, []);

    return (
        <div className="page">
            <Header />
            <div className="page-wrapper">
                <div className="info-boxes">
                    <div className="info-box">
                        <div className="info-top">
                            <h1>Total Connection</h1>
                            <MdPeopleOutline className="info-icon" />
                        </div>
                        <h2>{connections.length}</h2>
                        <p>Keep going!</p>
                    </div>
                    <div className="info-box">
                        <div className="info-top">
                            <h1>Upcoming Meetings</h1>
                            <AiOutlineCalendar className="info-icon" />
                        </div>
                        <h2>4</h2>
                        <p>This week</p>
                    </div>
                    <div className="info-box">
                        <div className="info-top">
                            <h1>Active Tasks</h1>
                            <GoTasklist className="info-icon" />
                        </div>
                        <h2>5</h2>
                        <p>Across all connections</p>
                    </div>

                </div>

                <div className="connections-content">
                    <div className="connections-left">
                        <ConnectionList
                            connections={connections}
                            setConnections={setConnections}
                            role={user.role}
                            onSelect={handleSelect}
                        />
                    </div>
                    {selectedConnection ?
                        <div className="connections-right">
                            <div className="connection-nav">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`tab ${activeTab === tab ? "tabPick" : "tabUnpick"}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="right-content">
                                {activeTab === 'Meetings' && (<Meetings upComing={upComing} meetingHistory={meetingHistory} connection={selectedConnection} />)}
                                {activeTab === 'Tasks' && (<Tasks />)}
                                {activeTab === 'Schedule' && (<Schedule connection={selectedConnection} timeSuggestions={timeSuggestions} upDate={handleSelect} />)}
                            </div>
                        </div> :
                        <div className="connections-right-empty">
                            <BsPeople className="empty-icon" />
                            <h2>Select a connection</h2>
                            <p>Choose a connection from list the list to view details and manage your relationship</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}