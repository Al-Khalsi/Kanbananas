import {RunningMode} from "@/constants/RunningMode";

export const Environment = {
    NODE_ENV: RunningMode.DEVELOPMENT, // "production" or "development"
    API_URL: "https://api.freetoolsy.com", // backend proxied under /api by caddy
    API_URL_DEV: "http://localhost:8086"
};