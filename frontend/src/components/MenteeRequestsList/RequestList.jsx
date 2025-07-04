import RequestCard from "./RequestCard";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { getMenteeRequests, requestResponse } from "../../services/mentorService";
import { createMentorship } from "../../services/mentorshipService";

export default function RequestList() {
    const [requests, setRequests] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchRequests = async () => {
            const results = await getMenteeRequests();
            setRequests(results);
        }
        fetchRequests();
    }, []);

    const handleResponse = async (requestId, menteeId, status) => {
        const respondedAt = new Date();
        await requestResponse(requestId, status, respondedAt);
        if (status === "ACCEPTED") {
            await createMentorship(menteeId, user.id);
        }
        setRequests(requests.filter(request => request.mentee.id !== menteeId));
    }

    return (
        <div>
            {requests.map(request => (
                <RequestCard
                    key={request.id}
                    mentee={request.mentee}
                    onAccept={() => handleResponse(request.id, request.mentee.id, "ACCEPTED")}
                    onReject={() => handleResponse(request.id, request.mentee.id, "DECLINED")}
                />
            ))}
        </div>
    )
}