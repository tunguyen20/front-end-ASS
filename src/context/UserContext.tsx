import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../controller";
import { userController } from "../controller/UserController";
import { UserInfor } from "../model/User";

interface UserProps {
    children: ReactNode
}

interface userModel {
    onsetUserInfor: () => void,
    onSetOpenFormLogin: (openFormLogin: boolean) => void,
    openFormLogin: boolean
    userInfor: UserInfor

}
const userDefault: userModel = {
    onsetUserInfor: () => { },
    onSetOpenFormLogin: (openFormLogin: boolean) => { },
    openFormLogin: false,
    userInfor: {
        address: "",
        email: "",
        firstName: "",
        idUser: "",
        lastName: "",
        phone: "",
        postcode: ""
    }
}

export const userContext = createContext<userModel>(userDefault)
const UserContextProvider = ({ children }: UserProps) => {
    const navigate = useNavigate()
    const [userInfor, setInforUser] = useState<UserInfor>({
        address: "",
        email: "",
        firstName: "",
        idUser: "",
        lastName: "",
        phone: "",
        postcode: ""
    })
    const [openFormLogin, SetOpenFormLogin] = useState<boolean>(false)

    authAxios.interceptors.response.use(
        response => response,
        err => {
            if (err.response.status == 401) {
                setInforUser({
                    address: "",
                    email: "",
                    firstName: "",
                    idUser: "",
                    lastName: "",
                    phone: "",
                    postcode: ""
                })
                SetOpenFormLogin(true)
            }
            else {
                
                navigate("/home")
            }
        }
    );
    useEffect(() => {
        SetOpenFormLogin(false)
        userController.getMe().then(res => {
            if (res != undefined) {
                setInforUser(res)
                SetOpenFormLogin(false)
            }
        })

    }, [])

    const onsetUserInfor = () => {
     
        authAxios.interceptors.response.use(
            response => response,
            err => {
                if (err.response.status == 401) {
                
                   
                    SetOpenFormLogin(true)
                }
                else if (err.response.status == 403) {

                }
            }
        );
        userController.getMe().then(res => {
            if (res != undefined) {
                setInforUser(res)
                SetOpenFormLogin(false)
            }

        })
    }
    const onSetOpenFormLogin = (boolean: boolean) => {
        SetOpenFormLogin(boolean)
    }
    const userContextData = { onsetUserInfor, userInfor, openFormLogin, onSetOpenFormLogin }
    return <userContext.Provider value={userContextData}>
        {children}
    </userContext.Provider>
}
export default UserContextProvider