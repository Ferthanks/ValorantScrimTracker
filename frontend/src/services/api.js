import axios from 'axios';

const API_URL = 'http://192.168.100.6:8081/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;