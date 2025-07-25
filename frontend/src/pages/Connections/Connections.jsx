import { BsPeople } from "react-icons/bs";
import { MdPeopleOutline } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { AiOutlineCalendar } from "react-icons/ai";
import { getAllConnections, getMeetingHistory, getUpcomingMeeting, suggestedSession, totalUpcomingSession } from "../../services/mentorshipService";
import { useCallback, useEffect, useState, useRef } from "react";
import { useUser } from "../../contexts/UserContext";
import ConnectionList from "../../components/ConnectionsList/ConnectionList";
import Header from "../../components/Header/Header";
import Meetings from "../../components/ConnectionsComp/Meetings";
import Schedule from "../../components/ConnectionsComp/Schedule";
import Tasks from "../../components/ConnectionsComp/Tasks";
import "./Connections.css"
import { getActiveTasks } from "../../services/taskService";
import Footer from "../../components/Footer/Footer";

export default function Connections() {
    const { user } = useUser();
    const [connections, setConnections] = useState([]);
    const tabs = ['Meetings', 'Tasks', 'Schedule'];
    const [activeTab, setActiveTab] = useState('Meetings');
    const [selectedConnection, setSelectedConnection] = useState(null);
    const [upComing, setUpcoming] = useState([]);
    const [meetingHistory, setMeetingHistory] = useState([]);
    const [timeSuggestions, setTimeSuggestions] = useState([]);
    const role = user.role === "MENTEE" ? "mentor" : "mentee";
    const [totalUpcoming, setTotalUpcoming] = useState(0);
    const [activeTasks, setActiveTasks] = useState(0);

    const refreshCounts = useCallback(async () => {
        const [total, active] = await Promise.all([
            totalUpcomingSession(),
            getActiveTasks()
        ]);
        setTotalUpcoming(total);
        setActiveTasks(active);
    }, []);

    useEffect(() => {
        const fetchConnections = async () => {
            const results = await getAllConnections(user.role);
            await refreshCounts();
            setConnections(results);
        }
        fetchConnections();
    }, [user.role])

    const lastSelectedRef = useRef(null);
    const handleSelect = useCallback(async (connection) => {
        lastSelectedRef.current = connection.id;
        setSelectedConnection(connection);

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
    });

    return (
        <div className="page">
            <Header />
            <div className="page-wrapper">
                <div className="info-boxes">
                    <div className="info-box">
                        <div className="info-top">
                            <h1>Total Connections</h1>
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
                        <h2>{totalUpcoming}</h2>
                        <p>This week</p>
                    </div>
                    <div className="info-box">
                        <div className="info-top">
                            <h1>Active Tasks</h1>
                            <GoTasklist className="info-icon" />
                        </div>
                        <h2>{activeTasks}</h2>
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
                                {activeTab === 'Meetings' && (<Meetings upComing={upComing} setUpcoming={setUpcoming} meetingHistory={meetingHistory} onCountUpdate={refreshCounts} connection={selectedConnection} />)}
                                {activeTab === 'Tasks' && (<Tasks connection={selectedConnection} onCountUpdate={refreshCounts} />)}
                                {activeTab === 'Schedule' && (<Schedule connection={selectedConnection} onCountUpdate={refreshCounts} update={handleSelect} timeSuggestions={timeSuggestions} />)}
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
            <Footer />
        </div>
    )
}