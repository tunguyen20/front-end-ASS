import React, { useEffect, useState } from 'react'
import { orderController } from '../../controller/OrderController'
import { OrderProduct } from '../../model/Order'
import "./OrderPage.css"
export default function OrderPage() {
    const [data, setdata] = useState<OrderProduct[]>([])
    useEffect(() => {
        orderController.Orders().then(res => {
            setdata(res.orders)

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
                            <p>{(item.time).toString()}</p>
                            <p>{item.lastName} {item.firstName} , Email: {item.email}, Address: {item.address}, Mobile: {item.mobile}, PostCode: {item.postcode}</p>
                        </div>
                        <div className="orderProducts">
                            <div className="imgOrderProduct">
                                <img src={item.products.img} alt="" />
                            </div>
                            <div className="nameOrderProduct">
                                <p>{item.products.name}</p>
                            </div>
                            <div className="quantity">X{item.products.quantity}</div>

                            <div className="priceOrderProduct"> {String(item.products.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</div>
                        </div>

                        <div className="total">Total:{String(Number(item.products.price) * Number(item.products.quantity)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</div>
                    </div>
                ))}


            </div>



        </div>
    )
}
