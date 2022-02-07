import { Cart, orderBook } from "./Cart";
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
    orderStatus: string
    orderDate: string
    firstName:string
    lastName:string
    phone:string
    email:string
    address:string
    postcode:string
    isTemporary:boolean
}
export interface orderBookProps {
    idBook: string
    price: number
    quantity: number
    idOrder: string
    bookTitle:string
    state:boolean,
    imageBookCover:string
}
export interface OrderWithDetail extends Order {
    orderBooks: orderBookProps[]
  
}