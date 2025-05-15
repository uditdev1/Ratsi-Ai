import axios from "axios";

axios.interceptors.request.use(
    req => {
        const token = localStorage.getItem("token");
        if(token) {
            req.headers['access_token'] = token;
        }
        return req;
    },
    error => {
        return Promise.reject(error);
    }
);
