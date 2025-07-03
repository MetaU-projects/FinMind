import axios from 'axios'

const createAPiInstance = (baseURL) => {
    return axios.create({
        baseURL,
        withCredentials: true
    });
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const mentorship = createAPiInstance(API_BASE_URL);

export const getAllConnections = async(role) => {
    try{
        const response = await mentorship.get(`/connections?role=${role}`);
        return response.data;
    } catch(err) {
        console.error("Error fetching connections", err);
        throw err;
    }
}