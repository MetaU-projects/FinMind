import { createAPIInstance, API_BASE_URL } from "../utils/api";
const mentorship = createAPIInstance(API_BASE_URL);

export const getUserInfo = async() => {
    try {
        const response = await mentorship.get(`/user/info`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

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
        throw new Error(err.response?.data?.error || err.message || 'Unknown error occurred');
    }
}

export const createSession = async (sessionInfo) => {
    try {
        const data = {...sessionInfo};
        const response = await mentorship.post('/session', data);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const deleteSession = async (sessionId) => {
    try {
        const response = await mentorship.delete(`/remove/session/${sessionId}`);
        return response.data;
    } catch(err) {
        throw new Error(err.response?.data?.error);
    }
}

export const getMeetingHistory = async (mentorshipId) => {
    try {
        const response = await mentorship.get(`/session/past/${mentorshipId}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}

export const getUpcomingMeeting = async (mentorshipId) => {
    try {
        const response = await mentorship.get(`/session/upcoming/${mentorshipId}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}

export const suggestedSession = async (mentorId) => {
    try {
        const response = await mentorship.get(`/suggest-time/${mentorId}`);
        return response.data;
    } catch(err) {
        throw new Error(err.response?.data?.error);
    }
}

export const totalUpcomingSession = async () => {
    try {
        const response = await mentorship.get('/session/total');
        return response.data;
    } catch(err) {
        throw new Error(err.response?.data?.error);
    }
}