import { createContext, ReactNode, useState } from "react";

interface UserProps {
    children: ReactNode
}

interface userModel {
    onSetName: (name: string) => void,
    onSetIdUser: (idUser: string) => void,
    idUser: string
    name: string
}
const userDefault: userModel = {
    onSetName: () => { },
    onSetIdUser: () => { },
    idUser: "0",
    name: "null"
}
export const userContext = createContext<userModel>(userDefault)
const UserContextProvider = ({ children }: UserProps) => {
    const [name, setName] = useState("")
    const [idUser, setIdUser] = useState("")
    const onSetName = (name: string) => {
        setName(name)
    }
    const onSetIdUser = (idUser: string) => {
        setIdUser(idUser)
    }

    const userContextData = { onSetName, onSetIdUser, idUser, name }
    return <userContext.Provider value={userContextData}>
        {children}
    </userContext.Provider>
}
export default UserContextProvider