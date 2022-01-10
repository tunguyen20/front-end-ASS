import axios from "axios";


const apiUrl = "http://localhost:3001";


const authAxios = axios.create(
    {
        baseURL: apiUrl,
        timeout: 3000
    })
authAxios.interceptors.response.use(
    response => response,
    err => {
        if (err.response.status === 403) {
            window.location.href = "/login"
        }
    }
);

authAxios.defaults.headers.common['Authorization'] = localStorage.getItem("jwt") || ""
export { authAxios }

