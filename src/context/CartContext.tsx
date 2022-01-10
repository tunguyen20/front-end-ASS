import { createContext, ReactNode, useState } from "react";

interface CartProps {
    children: ReactNode
}

interface quantityCartModel{
    onSetQuantity:(quantity:number)=>void,

    quantity: number
}
const QuantityDefault :quantityCartModel= {
    onSetQuantity: () => {},
    quantity: 0
}
export const CartContext = createContext<quantityCartModel>(QuantityDefault)
const CartContextProvider = ({ children }: CartProps) => {
    
    const [quantity, setQuantity] = useState(-1)
    const onSetQuantity = (quantity: number) => {
        setQuantity(quantity)
    }
    const userContextData = { onSetQuantity, quantity }
    return <CartContext.Provider value={userContextData}>
        {children}
    </CartContext.Provider>
}
export default CartContextProvider