import axios from 'axios'

const createAPIInstance = (baseURL) => {
    return axios.create({
        baseURL,
        withCredentials: true
    });
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
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

export const requestResponse = async (status, respondedAt) => {
    const data = { status, respondedAt }
    try {
        const response = await mentor.post('/request/update', data);
        return response.data;
    } catch (err) {
        console.error("Error sending request", err);
        throw err;
    }
}  
