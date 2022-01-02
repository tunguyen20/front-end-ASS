import React, { useEffect, useState } from 'react'
import { orderController } from '../../controller/OrderController'
import { HistoryOrder } from '../../model/Order'
import "./HistoryOrderPage.css"
export default function OrderPage() {
    const [data, setdata] = useState<HistoryOrder[]>([])
    useEffect(() => {
        orderController.HistoryOrders("1").then(res => {
            setdata(res)
            

        })
    }, [])
    console.log(data);
    return (
        <div>
            <div className="order">
                <div className='empty'>{data.length == 0 ? <div><h1>Danh sách trống</h1><img className='imgEmpty' src="https://beemall.io/search.png" alt="" /> <a href="/home">Home</a> </div> : ""}</div>
                {data.map((item, index) => (
                    <div className="orderProduct">
                        <div className="infoUser">
                            <p>{item.orderDate}</p>
                            <p>{item.lastName} {item.firstName} , Email: {item.email}, Address: {item.address}, Mobile: {item.phone}, PostCode: {item.postcode}</p>
                        </div>
                        <div className="orderProducts">
                            <div className="imgOrderProduct">
                                <img src={item.img} alt="" />
                            </div>
                            <div className="nameOrderProduct">
                                <p>{item.name}</p>
                            </div>
                            <div className="quantity">X{item.quantity}</div>

                            <div className="priceOrderProduct"> {String(item.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</div>
                        </div>

                        <div className="total">Total:{String(Number(item.price) * Number(item.quantity)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</div>
                    </div>
                ))}


            </div>



        </div>
    )
}
