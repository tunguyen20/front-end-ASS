

import Banner from "./Banner"
import "./Homepage.css"

import { Phone } from "../../model/Product"
import Videoreview from "./Videoreview"
import Products from "./Products"
import { useContext, useEffect } from "react"
import { userContext } from "../../context/UserContext"
import { userController } from "../../controller/UserController"
import { cartController } from "../../controller/CartController"
import { CartContext } from "../../context/CartContext"
export default function HomePage() {

    const { onSetName,onSetIdUser } = useContext(userContext);
    const { onSetQuantity } = useContext(CartContext)
    useEffect(() => {
        userController.getMe().then(res => {
            onSetName(res.firstName)
            onSetIdUser(res.idUser)
        })
        cartController.getCart("1").then(res => {
            onSetQuantity(Number(res.length))

        });

    }, [])
    return (
        <div>
            <Banner></Banner>

            <Products></Products>

            <Videoreview></Videoreview>
        </div>
    )
}
