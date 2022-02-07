import axios from "axios"
import { authAxios } from "."
import { Cart, Carts, orderBook } from "../model/Cart"
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

    async addCart(orderBook:orderBook,idUser:string) {
        return authAxios.post(`http://localhost:3001/add-cart/${idUser}`, { orderBook})
    }
    async getCart(idUser:string) {
        return authAxios.get(`http://localhost:3001/cart/${idUser}`).then(res => {
            if(res!=undefined){
                return res.data
            }
        })
    }
    async getInforUser(idUser:string) {
        return axios.get(`http://localhost:3001/get-infor-user/${idUser}`).then(res => {
            return res.data
        })
    }
    async savePlusQuantityBookCart(idOrderBook:string){
        return authAxios.post(`http://localhost:3001/save-plus-quantity-book-cart`,{idOrderBook})
    }
    async saveMinusQuantityBookCart(idOrderBook:string){
        return authAxios.post(`http://localhost:3001/save-minus-quantity-book-cart`,{idOrderBook})
    }
    async deleteProductCart(idOrderBook:string){
        return authAxios.post(`http://localhost:3001/delete-book-cart`,{idOrderBook})
    }
    async saveCheckout(userInfor:User,Carts:Carts){
        return authAxios.post(`http://localhost:3001/checkout`,{userInfor,Carts})
    }
}
export const cartController = new CartController()
