import Header from "../../components/Header/Header";
import PendingRequests from "../../components/MenteeHomeComp/PendingRequests";
import MentorList from "../../components/MentorsList/MentorsList";
import { getAllPendingRequests, getAvailableMentors } from "../../services/menteeService";
import { useState, useEffect } from "react";
import "./HomeMentee.css";
import ToolBar from "../../components/MenteeHomeComp/ToolBar";

export default function HomeMentee() {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await getAvailableMentors();
            const pendingResults = await getAllPendingRequests();
            setPendingRequests(pendingResults);
            setMentors(results);
        }
        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <div className="home-content">
                <div className="home-left">
                    <ToolBar />
                    <MentorList
                        mentors={mentors}
                        setMentors={setMentors}
                        setPendingRequests={setPendingRequests}
                    />
                </div>
                <div className="home-right">
                    <PendingRequests
                        pendingRequests={pendingRequests}
                        setMentors={setMentors}
                        setPendingRequests={setPendingRequests}
                    />
                </div>
            </div>
        </div>
    )
}