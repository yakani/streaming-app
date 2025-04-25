import axios from "axios";
export const todoInstance  = axios.create({
    baseURL:import.meta.env.VITE_Api2,
    
});