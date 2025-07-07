import axios from 'axios';

export const createAPIInstance = (baseURL) => {
    return axios.create({ baseURL,
        withCredentials: true
    });
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';