import axios from "axios"


class OrderController {
    // async Order(orderProduct: OrderProduct) {
    //     return axios.post("http://localhost:3001/order", { orderProduct })
    // }
    async HistoryOrders(idUser:string) {
        return axios.get(`http://localhost:3001/historyorders/${idUser}`, {}).then(res => {
            return res.data
        })
    }
}
export const orderController = new OrderController()