import { Pagination, Stack } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { userContext } from '../../context/UserContext'
import { orderController } from '../../controller/OrderController'
import { OrderWithDetail } from '../../model/Order'
import "./HistoryOrderPage.css"
export default function OrderPage() {
    const { userInfor } = useContext(userContext)
    const { onLoadCarts } = useContext(CartContext)
    const [pageCount, setPageCount] = useState<number>(0)
    const [data, setData] = useState<OrderWithDetail[]>([])
    useEffect(() => {
        onLoadCarts()
        orderController.HistoryOrders(userInfor.idUser, 3, 1).then(res => {
            if (res != undefined) {
                setPageCount(Math.ceil(res.bookCount / 3));
                setData(res.listOrder)
            }
        })
    }, [userInfor.idUser])
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        orderController.HistoryOrders(userInfor.idUser, 3, value).then(res => {
            if (res != undefined) {
                setPageCount(Math.ceil(res.bookCount / 3));
                setData(res.listOrder)
            }
        })
    };
    return (
        <div>
            {
                data.map((item, index) => (
                    <div key={index} className='containerCheckoutItem'>

                        <div className="orderHeader">
                            <div className="orderHeaderInforSHop">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ fontSize: 20, fill: 'rgb(85, 86, 85)' }}><path d="M22 5c0-1.654-1.346-3-3-3H5C3.346 2 2 3.346 2 5v2.831c0 1.053.382 2.01 1 2.746V19c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8.424c.618-.735 1-1.692 1-2.746V5zm-2 0v2.831c0 1.14-.849 2.112-1.891 2.167L18 10c-1.103 0-2-.897-2-2V4h3c.552 0 1 .449 1 1zM10 4h4v4c0 1.103-.897 2-2 2s-2-.897-2-2V4zM4 5c0-.551.448-1 1-1h3v4c0 1.103-.897 2-2 2l-.109-.003C4.849 9.943 4 8.971 4 7.831V5zm6 14v-3h4v3h-4zm6 0v-3c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H5v-7.131c.254.067.517.111.787.125A3.988 3.988 0 0 0 9 10.643c.733.832 1.807 1.357 3 1.357s2.267-.525 3-1.357a3.988 3.988 0 0 0 3.213 1.351c.271-.014.533-.058.787-.125V19h-3z" /></svg>
                                <p>Tikie</p>
                                <button className="viewShop">View shop</button>
                            </div>
                            <div className="orderHeaderTime">
                                <div className="timeOrder">{item.orderDate}<span>{item.orderStatus}</span></div>
                                <div className="code">{item.firstName + " " + item.lastName} ({item.phone} ), {item.postcode}, {item.email}, {item.address}</div>
                            </div>
                        </div>

                        {
                            item.orderBooks.map((item1, index1) => (

                                <div className="productCheckout" key={index1}>
                                    <div className="productCheckoutInfor">
                                        <img src={item1.imageBookCover} />
                                        <div className="inforProductCheckout">
                                            <h4 className="name">{item1.bookTitle}</h4>
                                            <div className="note">
                                                (  {item1.state == true ? "New" : "Old"} )
                                            </div>
                                            <div className="quantity">X
                                                {item1.quantity}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priceCheckout">
                                        <p>{(item1.quantity * item1.price)} VND</p>
                                    </div>
                                </div>
                            ))
                        }



                        <div className="totalProductCheckout">
                            <div className="shiping">
                                <p className='fee'>This shipping fee has not included</p>
                                <p className='cost'>Estimated cost : <span>{ } VND</span></p>
                                <p className='cost '>Shipping fee: <span className='cost1'>£0</span></p>
                            </div>
                            <div className="totalpriceShoping">
                                {/* <p>Total: <span> {formatMoney(total)} VND</span></p> */}
                            </div>
                        </div>

                    </div>
                ))
            }

            <Stack spacing={1} >
                <Pagination style={{ margin: "auto" }} count={pageCount} onChange={handleChangePage} variant="outlined" shape="rounded" />
            </Stack>
        </div>
    )
}
