import axios from "axios";
import { OrderProduct } from "../model/Order";
import { Product } from "../model/Product";


class ProductController {


    async list(search:string,page:number,pageSize:number){
        return axios.post("http://localhost:3001/products", {search,page,pageSize}).then(res => {
            return res.data
        })
    }
    async add(product: Product): Promise<Product[]> {
        return axios.post("http://localhost:3001/products/add", { product }).then(res => {
            return res.data.data
        })

    }
    async update(product: Product): Promise<Product[]> {
        return axios.put(`http://localhost:3001/products/edit/${product.idProduct}`, product).then(res => {
            return res.data.data
        })
    }
    delete(id: Number): Promise<Product[]> {
        return axios.delete(`http://localhost:3001/products/delete/${id}`).then(res => {
            return res.data.productsAfterDelete
        })
    }
    detail(id: number): Promise<Product> {
        return axios.get(`http://localhost:3001/products/${id}`).then(res => {
            return res.data.productDetail
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
    async Order(orderProduct:OrderProduct){
        return axios.post("http://localhost:3001/order", {orderProduct})
    }
    async Orders(){
        return axios.get("http://localhost:3001/orders", {}).then(res => {
            return res.data
        })
    }

}

export const productController = new ProductController();