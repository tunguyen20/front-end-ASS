import { Cart } from "./Cart";



// export interface Order {
//     id: number
//     idBuyer: number
//     //    products:OderProduct[]

// }
export interface HistoryOrder {
    name:string
    img:string
    price:number
    quantity:number
    firstName: string
    lastName: string
    address: string
    phone: string
    email: string
    postcode: string
    orderDate: number
}