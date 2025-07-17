import { createAPIInstance, API_BASE_URL } from "../utils/api";
const mentee = createAPIInstance(API_BASE_URL);

export const getAvailableMentors = async () => {
    try {
        const response = await mentee.get('/mentee/home');
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}

export const sendRequest = async (menteeId, mentorId) => {
    const data = { menteeId, mentorId };
    try {
        const response = await mentee.post('/request', data);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}

export const removeRequest = async (requestId) => {
    try {
        const response = await mentee.delete(`/request/remove/${requestId}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}

export const getAllPendingRequests = async () => {
    try {
        const response = await mentee.get('/pending');
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}

export const getRecommendedMentors = async () => {
    try {
        const response = await mentee.get('/recommendations');
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}