import axios from "axios"
import { Cart, orderProduct } from "../model/Cart"
import { user } from "../model/User"

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
class CartController {

    async addCart(orderProduct:orderProduct,idUser:string) {
        return axios.post(`http://localhost:3001/addcart/${idUser}`, { orderProduct})
    }
    async getCart(idUser:string) {
        return axios.get(`http://localhost:3001/cart/${idUser}`, {}).then(res => {
            return res.data
        })
    }
    async getInforUser(idUser:string) {
        return axios.get(`http://localhost:3001/getInforUser/${idUser}`).then(res => {
            return res.data
        })
    }
    async savePlusQuantityCart(idOrderProduct:string){
        return axios.post(`http://localhost:3001/savePlusQuantityCart`,{idOrderProduct})
    }
    async saveMinusQuantityCart(idOrderProduct:string){
        return axios.post(`http://localhost:3001/saveMinusQuantityCart`,{idOrderProduct})
    }
    async deleteProductCart(idOrderProduct:string){
        return axios.post(`http://localhost:3001/deleteProductCart`,{idOrderProduct})
    }
    async saveCheckout(inforUser:user,idOrder:string){
        return axios.post(`http://localhost:3001/checkout`,{inforUser,idOrder})
    }
}
export const cartController = new CartController()
