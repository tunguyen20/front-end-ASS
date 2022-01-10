import React, { useEffect, useState } from 'react'
import { orderController } from '../../controller/OrderController'
import { OrderWithDetail } from '../../model/Order'
import "./HistoryOrderPage.css"
export default function OrderPage() {
    const [data, setdata] = useState<OrderWithDetail[]>([])
    const [numberPage, setNumberPage] = useState<number[]>([]);
    const [indexPage, setIndexPage] = useState<number>(1);
    useEffect(() => {
        orderController.HistoryOrders("1", 2, 1).then(res => {
            setdata(res.listOrder)
            setNumberPage(res.arrNumberPageOrder);
        })
    }, [])

    let total: number = 0
    let onNumberPage = (index: number) => {
        orderController.HistoryOrders("1", 2, index).then(res => {
            setdata(res.listOrder)
            setNumberPage(res.arrNumberPageOrder)
            setIndexPage(index)
        })

    }
    let onPev = () => {
        if (indexPage > 1) {
            onNumberPage(indexPage - 1)
            setIndexPage(indexPage - 1)
        }
    }
    let onNext = () => {
        if (indexPage < numberPage.length) {
            onNumberPage(indexPage + 1)
            setIndexPage(indexPage + 1)
        }
    }

    return (
        <div>
            <div className="order">
                <div className='empty'>{data.length === 0 ? <div><h1>Danh sách trống</h1><img className='imgEmpty' src="https://beemall.io/search.png" alt="" /> <a href="/home">Home</a> </div> : ""}</div>
                {data.map((item, index) => (

                    <div key={index} className="orderProduct">
                        <div style={{ display: "none" }}>{total = 0}</div>
                        <div className="infoUser">
                            <p>{item.orderDate}</p>
                            <p>{item.user.firstName} {item.user.lastName} , Email: {item.user.email}, Address: {item.user.address}, Mobile: {item.user.phone}, PostCode: {item.user.postcode}</p>
                        </div>


                        {item.orderProducts.map((itemOrderProduct, index) => (
                            <div key={index} className="orderProducts">
                                <div className="imgOrderProduct">
                                    <img src={itemOrderProduct.product.img} alt="" />
                                </div>
                                <div className="nameOrderProduct">
                                    <p>{itemOrderProduct.product.name}</p>
                                </div>
                                <div className="quantity">X{itemOrderProduct.quantity}</div>
                                <div style={{ display: "none" }}>{total += (Number(itemOrderProduct.price) * Number(itemOrderProduct.quantity))}</div>
                                <div className="priceOrderProduct"> {String(itemOrderProduct.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</div>
                            </div>

                        ))}


                        <div className="total">Total:{String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</div>
                    </div>

                ))}


            </div>
            <div style={{ textAlign: "center", padding: "20px" }} className="paginatinonProduct">
                <button onClick={onPev} className={indexPage === 1 ? "activeBev" : ""} style={{ padding: "10px 20px", marginLeft: "10px", border: "0", borderRadius: "100px" }} >Pev</button>

                {numberPage.map((item, index) => (
                    <button className={indexPage === index + 1 ? "indexPage" : ''} key={index} style={{ padding: "10px 20px", marginLeft: "10px", borderRadius: "100px", border: "0" }} onClick={() => { onNumberPage(index + 1) }}>{index + 1}</button>
                ))}


                <button onClick={onNext} className={indexPage === numberPage.length ? "activeNext" : ""} style={{ padding: "10px 20px", marginLeft: "10px", borderRadius: "100px", border: 0 }} >Next</button>
            </div>



        </div>
    )
}
