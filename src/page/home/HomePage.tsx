

import Banner from "./Banner"
import "./Homepage.css"



import Products from "./Products"
import { useContext, useEffect } from "react"
import { userContext } from "../../context/UserContext"
import { userController } from "../../controller/UserController"
import { cartController } from "../../controller/CartController"
import { CartContext } from "../../context/CartContext"
import MapStore from "./MapBookStore"
export default function HomePage() {



    return (
        <div>
            <Banner />

            <Products></Products>

            <MapStore />
        </div>
    )
}
