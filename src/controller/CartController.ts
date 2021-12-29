import { Cart } from "../model/Cart"

export const getDataLocalCart = () => {
    let JSONCart = localStorage.getItem("Carts")
    let Carts: Cart[] = []
    if (JSONCart != null) {
        Carts = JSON.parse(JSONCart)
    }
return Carts
}
export const setDataLocalCart=(data:Cart[])=>{
    localStorage.setItem("Carts", JSON.stringify(data))
}