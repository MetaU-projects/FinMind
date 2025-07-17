import RequestCard from "./RequestCard";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { getMenteeRequests, requestResponse } from "../../services/mentorService";
import { createMentorship } from "../../services/mentorshipService";
import { requestStatus } from "../../utils/status";
import { removeRequest } from "../../services/menteeService";

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
        switch(status) {
            case requestStatus.ACCEPTED:
                await createMentorship(menteeId, user.id);
                break;
            case requestStatus.DECLINED:
                await removeRequest(requestId);
        }
        setRequests(requests.filter(request => request.mentee.id !== menteeId));
    }

    return (
        <div>
            {requests.map(request => (
                <RequestCard
                    key={request.id}
                    mentee={request.mentee}
                    onAccept={() => handleResponse(request.id, request.mentee.id, requestStatus.ACCEPTED)}
                    onReject={() => handleResponse(request.id, request.mentee.id, requestStatus.DECLINED)}
                />
            ))}
        </div>
    )
}