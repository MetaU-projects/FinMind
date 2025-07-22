import { createAPIInstance, API_BASE_URL } from "../utils/api";
const task = createAPIInstance(API_BASE_URL);

export const createTask = async (taskDetail) => {
    const data = { ...taskDetail };
    try {
        const response = await task.post('/task', data);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}

export const updateTask = async (taskId, status) => {
    const data = { taskId, status }
    try {
        const response = await task.patch('/task/update', data);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}

export const getTasks = async (mentorshipId) => {
    try {
        const response = await task.get(`/task/${mentorshipId}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.error);
    }
}