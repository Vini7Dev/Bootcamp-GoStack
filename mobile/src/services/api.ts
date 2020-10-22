import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.17.53.65:3333'
});

export default api;