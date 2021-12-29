import axios from "axios"
import { OrderProduct } from "../model/Order"

class OrderController {
    async Order(orderProduct: OrderProduct) {
        return axios.post("http://localhost:3001/order", { orderProduct })
    }
    async Orders() {
        return axios.get("http://localhost:3001/orders", {}).then(res => {
            return res.data
        })
    }
}
export const orderController = new OrderController()