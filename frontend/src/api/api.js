import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000/api" : "/api");

const API = axios.create({
    baseURL
});

let activeRequests = 0;

function updateLoading(value) {
    activeRequests += value;
    if (activeRequests < 0) activeRequests = 0;
    
    if (activeRequests > 0) {
        window.dispatchEvent(new CustomEvent("axios-loading", { detail: true }));
    } else {
        window.dispatchEvent(new CustomEvent("axios-loading", { detail: false }));
    }
}

// Attach user-id header & track requests
API.interceptors.request.use((req) => {
    updateLoading(1);
    const token = localStorage.getItem("token");
    if (token) req.headers["Authorization"] = `Bearer ${token}`;
    return req;
}, (error) => {
    updateLoading(-1);
    return Promise.reject(error);
});

// Track responses
API.interceptors.response.use((res) => {
    updateLoading(-1);
    return res;
}, (error) => {
    updateLoading(-1);
    return Promise.reject(error);
});

export default API;
