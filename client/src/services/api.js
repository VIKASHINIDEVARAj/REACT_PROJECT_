import axios from 'axios';

const API = axios.create({
    baseURL:'https://react-project-libo.onrender.com/api', 
});
export default API;
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        // 'Bearer' ku apram oru space kandippa irukanum
        req.headers.Authorization = `Bearer ${token}`; 
    }
    return req;
}, (error) => {
    return Promise.reject(error);
});
