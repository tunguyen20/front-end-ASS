import { useState } from "react";
import { ImgProduct } from "./Image";

export interface Product {
    idProduct: number
    price: number
    name: string
    img: string
}


export const getDataLocal = () => {
    let prosucts = [];
    let JSONsp = localStorage.getItem("Products")
    if (JSONsp != null) {
        prosucts = JSON.parse(JSONsp)
    }
    return prosucts
}
export const setDataLocal = (product: Product[]) => {
    localStorage.setItem("Products", JSON.stringify(product))
}



export const Phone: Product[] = [
    {
        idProduct: 1,
        price: 1,
        name: "B6",
        img: "anh1"

    },
    {
        idProduct: 2,
        price: 2,
        name: "B7",
        img: "anh2"

    },
    {
        idProduct: 3,
        price: 3,
        name: "B8",
        img: "anh3"

    }
]



