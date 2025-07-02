import axios from 'axios'

const createAPiInstance = (baseURL) => {
    return axios.create({ baseURL,
        withCredentials: true
    });
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const mentee = createAPiInstance(API_BASE_URL);

export const getAvailableMentors = async () => {
    try {
        const response = await mentee.get('/mentee/home');
        return response.data;
    } catch(err) {
        console.error("Error fetching mentors", err);
        throw err;
    }
}