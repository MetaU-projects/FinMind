import Header from "../../components/Header/Header";
import PendingRequests from "../../components/MenteeHomeComp/PendingRequests";
import MentorList from "../../components/MentorsList/MentorsList";
import { getAllPendingRequests, getAvailableMentors } from "../../services/menteeService";
import { useState, useEffect } from "react";

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
            <MentorList
                mentors={mentors}
                setMentors={setMentors}
                setPendingRequests={setPendingRequests}
            />
            <div className="mentee-sidebar">
                <PendingRequests
                    pendingRequests={pendingRequests}
                    setMentors={setMentors}
                    setPendingRequests={setPendingRequests}
                />
            </div>
        </div>
    )
}