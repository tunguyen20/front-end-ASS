
import { Product } from "./Product";

// export interface Cart {
//     idOrderProduct:string,
//     idOrder:string
//     idProduct: number
//     price: number
//     name: string
//     img: string
//     quantity:number
// }
export interface orderBook {
    idBook: string
    price: number
    quantity:number
    idOrder:string
}

export interface Cart {
    idBook: string
    price: number
    quantity:number
    imageBookCover:string
    bookTitle:string
    idOrderBook:string
    state:boolean
}
export interface Carts {
    idOrder:string
    Cart:Cart[]
}
