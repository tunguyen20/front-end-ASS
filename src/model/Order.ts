import { Cart } from "./Cart";
import { ImgProduct } from "./Image";


// export interface Order {
//     id: number
//     idBuyer: number
//     //    products:OderProduct[]

// }
export interface OrderProduct {
    products: Cart
    firstName: string
    lastName: string
    address: string
    mobile:string
    email:string
    postcode:string
    time: number
}