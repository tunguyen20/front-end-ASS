
import { Product } from "./Product";

export interface Cart {
    idOrderProduct:string,
    idOrder:string
    idProduct: number
    price: number
    name: string
    img: string
    quantity:number
}
export interface orderProduct {
    idProduct: string
    price: number
    quantity:number
}