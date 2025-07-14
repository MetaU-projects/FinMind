import Header from "../../components/Header/Header";
import PendingRequests from "../../components/MenteeHomeComp/PendingRequests";
import MentorList from "../../components/MentorsList/MentorsList";
import { getAllPendingRequests, getAvailableMentors, getRecommendedMentors } from "../../services/menteeService";
import { useState, useEffect } from "react";
import "./HomeMentee.css";
import ToolBar from "../../components/MenteeHomeComp/ToolBar";
import Recommended from "../../components/MenteeHomeComp/Recommendations";

export default function HomeMentee() {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [recommend, setRecommend] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const results = await getAvailableMentors();
            const pendingResults = await getAllPendingRequests();
            const recomData = await getRecommendedMentors();
            setPendingRequests(pendingResults);
            setMentors(results);
            setRecommend(recomData);
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
                    <Recommended recommend={recommend} />
                </div>
            </div>
        </div>
    )
}