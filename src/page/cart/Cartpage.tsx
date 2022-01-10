
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { cartController } from '../../controller/CartController';
import { orderController } from '../../controller/OrderController';
import { productController } from '../../controller/ProductController';
import { User } from '../../model/User';

import { Cart } from '../../model/Cart';


import "./CartPage.css"
import CartPageProduct from './CartPageProduct';
import { userInfo } from 'os';
import { CartContext } from '../../context/CartContext';
import { userContext } from '../../context/UserContext';
import { userController } from '../../controller/UserController';
export default function Cartpage() {

    let inforUser: User = {
        idUser: "1", firstName: "", lastName: "", address: "", email: "", phone: "", postcode: ""
    }
    const [cartProducts, setCartProducts] = useState<Cart[]>([]);
    const [infor, setInfo] = useState<User>(inforUser);
    const { onSetQuantity } = useContext(CartContext)
    const [idUser, setIdUser] = useState("")
  
    let total = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        total += cartProducts[i].price * cartProducts[i].quantity
    }
    useEffect(() => {
        userController.getMe().then(res => {
            cartController.getCart(res.idUser).then(res => {
                setCartProducts(res)
                onSetQuantity(Number(res.length))
            });  
            setIdUser(res.idUser) 
        })

    }, [])

    const onPlus = (idOrderProduct: string) => {
        cartController.savePlusQuantityCart(idOrderProduct)
        cartController.getCart(idUser).then(res => {
            setCartProducts(res)
        });

    }
    const onMinus = (idOrderProduct: string, quantity: number) => {
        if (quantity > 1) {
            cartController.saveMinusQuantityCart(idOrderProduct)
            cartController.getCart(idUser).then(res => {
                setCartProducts(res)

            });
        }
    }
    const onDelete = (idOrderProduct: string) => {
        cartController.deleteProductCart(idOrderProduct)
        cartController.getCart(idUser).then(res => {
            onSetQuantity(Number(res.length))

        });
        cartController.getCart(idUser).then(res => {
            setCartProducts(res)

        });
    }
    const onCheckout = () => {
        cartController.saveCheckout(infor, cartProducts[0].idOrder)

    }
    const onOrder = () => {
        cartController.getInforUser(idUser).then(res => {
            console.log(res);

            setInfo(res[0])
        })

    }
    return (

        <div>
            <div className="cart">
                <div className="productCart">
                    <div>{cartProducts.length == 0 ? <div><h1>Giỏ hàng trống</h1><img className='imgEmpty' src="https://beemall.io/search.png" alt="" /> <a href="/home">Home</a> </div> : ""}</div>
                    {cartProducts.map((item, index) => (
                        <CartPageProduct key={index} product={item} onPlus={onPlus} onMinus={onMinus} onDelete={onDelete} />
                    )
                    )}
                </div> {cartProducts.length != 0 ?
                    <div className="totalCart">
                        <h1>Tổng Tiền</h1>
                        <h2>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  đ</h2>
                        <a onClick={onOrder} href="#checkout">Order</a>
                    </div> : ""}


                <div id="checkout" className="modal">
                    <div className="modal__content">
                        <h1>Delivery</h1>
                        <input type="text" value={infor.firstName} placeholder='Fisrt name' onChange={e => { setInfo({ ...infor, firstName: e.target.value }) }} />
                        <input type="text" value={infor.lastName} placeholder='Last name' onChange={e => { setInfo({ ...infor, lastName: e.target.value }) }} />
                        <input type="text" value={infor.phone} placeholder='Mobile' onChange={e => { setInfo({ ...infor, phone: e.target.value }) }} />
                        <input type="text" value={infor.email} placeholder='Email' onChange={e => { setInfo({ ...infor, email: e.target.value }) }} />
                        <input type="text" value={infor.address} placeholder='Address' onChange={e => { setInfo({ ...infor, address: e.target.value }) }} />
                        <input type="text" value={infor.postcode} placeholder='Postcode' onChange={e => { setInfo({ ...infor, postcode: e.target.value }) }} />
                        <Link to="/order"><button onClick={onCheckout} >Checkout</button></Link>

                        <a href="#" className="modal__close">&times;</a>
                    </div>
                </div>
            </div>



        </div>


    )
}
