import axios from "axios";
import { i18nInstance } from "../locales";

const http = axios.create({
    baseURL: "https://localhost:8443",
    withCredentials: true,
});

http.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = i18nInstance.language;
    return config;
});

export default http;
