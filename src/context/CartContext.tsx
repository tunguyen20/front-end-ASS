import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authAxios } from "../controller";
import { cartController } from "../controller/CartController";
import { Carts } from "../model/Cart";
import { userContext } from "./UserContext";

interface CartProps {
    children: ReactNode
}

interface CartModel {
    onLoadCarts: () => void,
    ListCart: Carts
}
const CartDefault: CartModel = {
    ListCart: {
        idOrder: "",
        Cart: [{
            idBook: "",
            price: 0,
            quantity: 0,
            imageBookCover: "",
            bookTitle: "",
            idOrderBook: "",
            state: false
        }]
    },
    onLoadCarts: () => { }
}
export const CartContext = createContext<CartModel>(CartDefault)
const CartContextProvider = ({ children }: CartProps) => {
    const { userInfor } = useContext(userContext);
    const [ListCart, setListCart] = useState<Carts>({
        idOrder: "",
        Cart: [{
            idBook: "",
            price: 0,
            quantity: 0,
            imageBookCover: "",
            bookTitle: "",
            idOrderBook: "",
            state: false
        }]
    })
    useEffect(() => {
        if (userInfor.idUser != "") {
            cartController.getCart(userInfor.idUser).then(res => {
                let temp: Carts = res
                if (temp.Cart.length == 0) {
                    setListCart({
                        idOrder: res.idOrder,
                        Cart: [{
                            idBook: "",
                            price: 0,
                            quantity: 0,
                            imageBookCover: "",
                            bookTitle: "",
                            idOrderBook: "",
                            state: false
                        }]
                    })
                }
                else{
                    setListCart(res)    
                }
            })
        }
    }, [userInfor.idUser])

    const onLoadCarts = () => {
        if (userInfor.idUser != "") {
            cartController.getCart(userInfor.idUser).then(res => {
                let temp: Carts = res
                if (temp.Cart.length == 0) {
                    setListCart({
                        idOrder:res.idOrder,
                        Cart: [{
                            idBook: "",
                            price: 0,
                            quantity: 0,
                            imageBookCover: "",
                            bookTitle: "",
                            idOrderBook: "",
                            state: false
                        }]
                    })
                }
                else{
                    setListCart(res)
                }
            })
        }else{
            setListCart({
                idOrder:"",
                Cart: [{
                    idBook: "",
                    price: 0,
                    quantity: 0,
                    imageBookCover: "",
                    bookTitle: "",
                    idOrderBook: "",
                    state: false
                }]
            })
        }

    }
    const userContextData = { ListCart, onLoadCarts }
    return <CartContext.Provider value={userContextData}>
        {children}
    </CartContext.Provider>
}
export default CartContextProvider