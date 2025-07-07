import { createAPIInstance, API_BASE_URL } from "../utils/api";
const mentor = createAPIInstance(API_BASE_URL);

export const getMenteeRequests = async () => {
    try {
        const response = await mentor.get('/requests/mentor');
        return response.data;
    } catch (err) {
        console.error("Error fetching mentee requests");
        throw err;
    }
}

export const requestResponse = async (requestId, status, respondedAt) => {
    const data = { requestId, status, respondedAt }
    try {
        const response = await mentor.patch('/request/update', data);
        return response.data;
    } catch (err) {
        console.error("Error sending request", err);
        throw err;
    }
}  
