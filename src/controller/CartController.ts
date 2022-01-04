import axios from "axios"
import { Cart, orderProduct } from "../model/Cart"
import { User } from "../model/User"

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
        return axios.post(`http://localhost:3001/add-cart/${idUser}`, { orderProduct})
    }
    async getCart(idUser:string) {
        return axios.get(`http://localhost:3001/cart/${idUser}`, {}).then(res => {
            return res.data
        })
    }
    async getInforUser(idUser:string) {
        return axios.get(`http://localhost:3001/get-infor-user/${idUser}`).then(res => {
            return res.data
        })
    }
    async savePlusQuantityCart(idOrderProduct:string){
        return axios.post(`http://localhost:3001/save-plus-quantity-product-cart`,{idOrderProduct})
    }
    async saveMinusQuantityCart(idOrderProduct:string){
        return axios.post(`http://localhost:3001/save-minus-quantity-product-cart`,{idOrderProduct})
    }
    async deleteProductCart(idOrderProduct:string){
        return axios.post(`http://localhost:3001/delete-product-cart`,{idOrderProduct})
    }
    async saveCheckout(inforUser:User,idOrder:string){
        return axios.post(`http://localhost:3001/checkout`,{inforUser,idOrder})
    }
}
export const cartController = new CartController()
