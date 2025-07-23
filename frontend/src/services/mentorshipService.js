import { createAPIInstance, API_BASE_URL } from "../utils/api";
const mentorship = createAPIInstance(API_BASE_URL);

export const getAllConnections = async (role) => {
    try {
        const response = await mentorship.get(`/connections?role=${role}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}

export const createMentorship = async (menteeId, mentorId) => {
    const data = { menteeId, mentorId };
    try {
        const response = await mentorship.post('/connected', data);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}

export const endMentorship = async (connectionId) => {
    try {
        const response = await mentorship.delete(`/connection/remove/${connectionId}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}

export const allInterests = async() => {
    try {
        const response = await mentorship.get('/interests');
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}