import RequestCard from "./RequestCard";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { getMenteeRequests, requestResponse } from "../../services/mentorService";
import { createMentorship } from "../../services/mentorshipService";
import { requestStatus } from "../../utils/status";
import { removeRequest } from "../../services/menteeService";

export default function RequestList({ requests, onSelect, setMenteeId, setRequestId, setReqStatus, onReqResponse }) {
    const handleResponse = (requestId, menteeId, status) => {
        setRequestId(requestId); 
        setMenteeId(menteeId); 
        setReqStatus(status);
        onReqResponse();
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-xl">
            {requests.map(request => (
                <RequestCard
                    key={request.id}
                    mentee={request.mentee}
                    onAccept={() => handleResponse(request.id, request.mentee.id, requestStatus.ACCEPTED)}
                    onReject={() => handleResponse(request.id, request.mentee.id, requestStatus.DECLINED)}
                    onSelect={onSelect}
                />
            ))}
        </div>
    )
}