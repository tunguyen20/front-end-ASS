import axios from "axios";
import { authAxios } from ".";


import { Product } from "../model/Product";



class ProductController {

    async list(search: string, page: number, pageSize: number) {
        return authAxios.post("http://localhost:3001/products", { search, page, pageSize }).then(res => {
            return res.data
        })
    }
    async add(product: Product): Promise<Product[]> {
        return authAxios.post("http://localhost:3001/products/add", { product }).then(res => {
            return res.data.data
        })

    }
    async update(product: Product): Promise<Product[]> {
        return axios.put(`http://localhost:3001/products/edit/${product.idProduct}`, product).then(res => {
            return res.data.data
        })
    }
    delete(id: string) {
        return axios.delete(`http://localhost:3001/products/delete/${id}`)
    }
   async detail(id: string): Promise<Product> {

        return authAxios.get(`/products/${id}`).then(res => {
            return res.data
        })
    }

    // search(name: string): Promise<Product[]> {
    //     return axios.get(`http://localhost:3001/products/search/name/${name}`).then(res => {
    //         return res.data.dataSearch
    //     })
    // }
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