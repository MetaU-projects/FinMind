import { createAPIInstance, API_BASE_URL } from "../utils/api";
const mentorship = createAPIInstance(API_BASE_URL);

export const getAllConnections = async (role) => {
    try {
        const response = await mentorship.get(`/connections?role=${role}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching connections", err);
        throw err;
    }
}

export const createMentorship = async (menteeId, mentorId) => {
    const data = { menteeId, mentorId };
    try {
        const response = await mentorship.post('/connected', data);
        return response.data;
    } catch (err) {
        console.error("Error creating connection", err);
        throw err;
    }
}