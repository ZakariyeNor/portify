import axios from "axios";

// Declare api
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api


