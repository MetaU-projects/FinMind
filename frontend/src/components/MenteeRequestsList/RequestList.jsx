import RequestCard from "./RequestCard";
import { requestStatus } from "../../utils/status";

export default function RequestList({ requests, onSelect, onReqResponse }) {
    const handleResponse = (requestId, menteeId, status) => {
        onReqResponse(requestId, menteeId, status);
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