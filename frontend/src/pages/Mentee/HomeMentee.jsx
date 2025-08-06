import Header from "../../components/Header/Header";
import PendingRequests from "../../components/MenteeHomeComp/PendingRequests";
import MentorList from "../../components/MentorsList/MentorsList";
import { getAllPendingRequests, getAvailableMentors, getRecommendedMentors, searchMentors } from "../../services/menteeService";
import { useState, useEffect } from "react";
import "./HomeMentee.css";
import ToolBar from "../../components/MenteeHomeComp/ToolBar";
import Recommended from "../../components/MenteeHomeComp/Recommendations";
import Footer from "../../components/Footer/Footer";
import ProfileModal from "../../components/ProfileModal/ProfileModal";
import { sendRequest } from "../../services/menteeService";
import { useUser } from "../../contexts/UserContext";
import CardSkeleton from "../../components/loading/CardSkeleton";
import { toast } from "react-hot-toast";
import ErrorModal from "../../components/ErrorModal/ErrorModal";

export default function HomeMentee() {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [recommend, setRecommend] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [pickMentor, setPickMentor] = useState(null);
    const [activePanel, setActivePanel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMentor, setLoadingMentor] = useState(null);
    const [error, setError] = useState("")
    const { user } = useUser();

    const fetchData = async () => {
        try {
            setLoading(true);
            const results = await getAvailableMentors();
            const pendingResults = await getAllPendingRequests();
            const recomData = await getRecommendedMentors();
            setPendingRequests(pendingResults);
            setMentors(results);
            setRecommend(recomData);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }

    const handleMentorSearch = async (query) => {
        setLoading(true);
        const data = await searchMentors(query);
        setMentors(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleConnectionReq = async (clickedMentorId) => {
        if(!user?.id || !clickedMentorId){
            toast.error("Invalid user or mentor");
            return;
        }
        setLoadingMentor(clickedMentorId);
        try{
        const newRequest = await sendRequest(user.id, clickedMentorId);
        setMentors(mentors.filter(mentor => mentor.id !== clickedMentorId));
        setPendingRequests(prev => [...prev, newRequest]);
        } catch(err) {
            toast.error("Could not send request");
        } finally {
            setLoadingMentor(null);
        }
    }

    const togglePanel = (panel) => {
        setActivePanel(prev => (prev === panel ? null : panel));
    }

    return (
        <div>
            {error && <ErrorModal error={error} setError={setError} />}
            <div className="home-page">
                <div className="home-header">
                    <Header togglePanel={togglePanel} />
                    {activePanel === 'pending' &&
                        <PendingRequests
                            pendingRequests={pendingRequests}
                            setMentors={setMentors}
                            setPendingRequests={setPendingRequests}
                        />
                    }
                    {activePanel === 'recommended' &&
                        <Recommended recommend={recommend} />
                    }
                    <ToolBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleMentorSearch} setMentors={setMentors} getData={fetchData} />
                </div>
                <div className="home-content">
                    {!loading ? (
                        <MentorList
                            mentors={mentors}
                            setMentors={setMentors}
                            onRequest={handleConnectionReq}
                            setPendingRequests={setPendingRequests}
                            onSelect={setPickMentor}
                            loadingMentor={loadingMentor}
                        />
                    ) : (
                        <CardSkeleton />
                    )}
                </div>
                <Footer />
            </div>
            {pickMentor &&
                <ProfileModal setPickMentor={setPickMentor} userInfo={pickMentor} />
            }
        </div>
    )
}