import axios from "axios"
import { authAxios } from "."


class OrderController {

    async HistoryOrders(idUser:string,pageSize:number,page:number) {
        return authAxios.post(`http://localhost:3001/orders`, {idUser,pageSize,page}).then(res => {
            if(res!=undefined){
                 return res.data
            }
           
        })
    }
}
export const orderController = new OrderController()