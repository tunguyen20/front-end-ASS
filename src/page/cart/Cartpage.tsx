
import React, { useState } from 'react'
import { getDataLocalCart, setDataLocalCart } from '../../controller/CartController';
import { orderController } from '../../controller/OrderController';
import { productController } from '../../controller/ProductController';

import { Cart } from '../../model/Cart';
import { OrderProduct } from '../../model/Order';


import "./CartPage.css"
import CartPageProduct from './CartPageProduct';
export default function Cartpage() {

    let productOrder: OrderProduct = {
        products: { idProduct: 0, name: "", price: 0, img: "", quantity: 0 }, firstName: "", lastName: "", address: "", email: "", mobile: "", postcode: "", time: 0,

    }

    const [cartProducts, setCartProducts] = useState<Cart[]>(getDataLocalCart);
    const [info, setInfo] = useState<OrderProduct>(productOrder);
    let total = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        total += cartProducts[i].price * cartProducts[i].quantity
    }

    const onPlus = (quantity: number, id: number) => {
        for (let i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].idProduct == id) {
                cartProducts[i].quantity = quantity + 1
                setCartProducts(cartProducts.slice())
                setDataLocalCart(cartProducts)

            }
        }
    }
    const onMinus = (quantity: number, id: number) => {
        if (quantity > 1) {
            for (let i = 0; i < cartProducts.length; i++) {
                if (cartProducts[i].idProduct == id) {
                    cartProducts[i].quantity = quantity - 1
                    setCartProducts(cartProducts.slice())
                    setDataLocalCart(cartProducts)
                }
            }
        }

    }
    const onDelete = (id: number) => {
        let cartProduct = cartProducts.filter(products => products.idProduct != id)
        setCartProducts(cartProduct)
        setDataLocalCart(cartProduct)
    }
    const onCheckout = () => {
        let productOrder: OrderProduct;
        for (let i = 0; i < cartProducts.length; i++) {
            productOrder = {
                products: cartProducts[i],
                firstName: info.firstName,
                lastName: info.lastName,
                address: info.address,
                email: info.email,
                mobile: info.mobile,
                postcode: info.postcode,
                time: Date.now()
            }
            orderController.Order(productOrder)
        }
        setCartProducts([])
        setDataLocalCart([])

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
                </div>
                <div className="totalCart">
                    <h1>Tổng Tiền</h1>
                    <h2>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  đ</h2>
                    <a href="#checkout">Order</a>
                </div>

                <div id="checkout" className="modal">
                    <div className="modal__content">
                        <h1>Delivery</h1>
                        <input type="text" placeholder='Fisrt name' onChange={e => { setInfo({ ...info, firstName: e.target.value }) }} />
                        <input type="text" placeholder='Last name' onChange={e => { setInfo({ ...info, lastName: e.target.value }) }} />
                        <input type="text" placeholder='Mobile' onChange={e => { setInfo({ ...info, mobile: e.target.value }) }} />
                        <input type="text" placeholder='Email' onChange={e => { setInfo({ ...info, email: e.target.value }) }} />
                        <input type="text" placeholder='Address' onChange={e => { setInfo({ ...info, address: e.target.value }) }} />
                        <input type="text" placeholder='Postcode' onChange={e => { setInfo({ ...info, postcode: e.target.value }) }} />
                        <a href="/cart"><button onClick={onCheckout} >Checkout</button></a>
                        <a href="#" className="modal__close">&times;</a>
                    </div>
                </div>
            </div>



        </div>


    )
}
