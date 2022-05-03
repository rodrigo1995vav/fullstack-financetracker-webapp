import axios from "axios";
const apiUrl = "http://localhost:3000/api/auth";



export function registerUser(body) {
    return axios.post(apiUrl + "/register", body);
}

export function loginUser(body) {
    return axios.post(apiUrl + "/login", body);
}

