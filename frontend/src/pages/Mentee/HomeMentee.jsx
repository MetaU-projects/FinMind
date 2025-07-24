import Header from "../../components/Header/Header";
import PendingRequests from "../../components/MenteeHomeComp/PendingRequests";
import MentorList from "../../components/MentorsList/MentorsList";
import { getAllPendingRequests, getAvailableMentors, getRecommendedMentors, searchMentors } from "../../services/menteeService";
import { useState, useEffect } from "react";
import "./HomeMentee.css";
import ToolBar from "../../components/MenteeHomeComp/ToolBar";
import Recommended from "../../components/MenteeHomeComp/Recommendations";
import Footer from "../../components/Footer/Footer";

export default function HomeMentee() {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [recommend, setRecommend] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async () => {
            const results = await getAvailableMentors();
            const pendingResults = await getAllPendingRequests();
            const recomData = await getRecommendedMentors();
            setPendingRequests(pendingResults);
            setMentors(results);
            setRecommend(recomData);
        }
 

    const handleMentorSearch = async(query) => {
        const data = await searchMentors(query);
        setMentors(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="home-page">
            <div className="home-header">
                <Header />
                <ToolBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleMentorSearch} setMentors={setMentors} getData={fetchData} />
            </div>
            <div className="home-content">
                <div className="home-left">
                    <PendingRequests
                        pendingRequests={pendingRequests}
                        setMentors={setMentors}
                        setPendingRequests={setPendingRequests}
                    />
                    <Recommended recommend={recommend} />
                </div>
                <div className="home-right">
                    <MentorList
                        mentors={mentors}
                        setMentors={setMentors}
                        setPendingRequests={setPendingRequests}
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}