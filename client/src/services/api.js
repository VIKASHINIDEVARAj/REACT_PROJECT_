import axios from 'axios';

// 1. Base URL setup panrom - Ithu namma backend server oda base URL-a set panrom, so that ellaa API calls-um idha use pannum.
const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

// 2. The Automatic Security Guard (Interceptor)
// Ovvoru thadavayum request pogum pothu, local storage-la 'token' irukka nu thedum.
// Iruntha, athai automatic-a 'Bearer Token' maari attach panni anuppidum!
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;