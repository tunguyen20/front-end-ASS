import { Cart } from "./Cart";
import { Product } from "./Product";
import { User } from "./User";



// export interface Order {
//     id: number
//     idBuyer: number
//     //    products:OderProduct[]

// }
export interface Order {
    idOrder: string
    idUser: string
    orderStatus: boolean
    orderDate: string
}
export interface OrderProduct {
    id: string
    idOrder: string
    idProduct: string
    quantity: number
    price: number
    product: Product
}
export interface OrderWithDetail extends Order {
    orderProducts: OrderProduct[]
    user: User
}