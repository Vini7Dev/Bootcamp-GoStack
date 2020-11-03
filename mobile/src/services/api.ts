import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.17.194.81:3333'
});

export default api;