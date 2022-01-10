import axios from "axios";
import { authAxios } from ".";

class UserController {

    async CheckLogin(userName:string,password:string) {
        return axios.post(`http://localhost:3001/login`, {userName,password}).then(res => {
            return res.data
        })
    }
    async getMe() {
        return authAxios.get(`http://localhost:3001/get-me`).then(res => {
            return res.data
        })
    }
}

export const userController = new UserController();