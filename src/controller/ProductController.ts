import axios from "axios";
import { authAxios } from ".";


import { BookLine, Product } from "../model/Product";



class ProductController {

    async list(search: string, page: number, pageSize: number) {
        return authAxios.post("http://localhost:3001/products", { search, page, pageSize }).then(res => {
            return res.data
        })
    }
    async listAdmin(search: string, page: number, pageSize: number) {
        return authAxios.post("http://localhost:3001/products-admin", { search, page, pageSize }).then(res => {
            return res.data
        })
    }

   
    async add(bookLine: BookLine) {
        return authAxios.post("http://localhost:3001/add-products", { bookLine }).then(res => {
            return res.data
        })

    }
    async getListCategory() {
        return axios.get("http://localhost:3001/get-list-category").then(res => {
            return res.data
        })
    }
    async getListPublisher() {
        return axios.get("http://localhost:3001/get-list-publisher").then(res => {
            return res.data
        })
    }

    delete(id: string) {
        return axios.delete(`http://localhost:3001/delete-book/${id}`)
    }
    async detail(id: string) {
        return authAxios.get(`/book/${id}`).then(res => {
            return res.data
        })
    }

    search(search:string,idCategory:string,sortBy:string,minPrice:number,maxPrice:number, page: number, pageSize: number) {
        return axios.post(`http://localhost:3001/product/search`,{search,idCategory,sortBy,minPrice,maxPrice,page,pageSize}).then(res => {
            return res.data
        })
    }
    // pagination(page: number) {
    //     return axios.get(`http://localhost:3001/products/page/${page}`).then(res => {
    //         return (res.data)
    //     })
    // }
    // async Order(orderProduct:OrderProduct){
    //     return axios.post("http://localhost:3001/order", {orderProduct})
    // }


}

export const productController = new ProductController();