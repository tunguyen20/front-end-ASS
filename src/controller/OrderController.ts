import axios from "axios"
import { authAxios } from "."


class OrderController {

    async HistoryOrders(idUser:string,pageSize:number,pageIndex:number) {
        return authAxios.post(`http://localhost:3001/historyorders`, {idUser,pageSize,pageIndex}).then(res => {
            return res.data
        })
    }
}
export const orderController = new OrderController()