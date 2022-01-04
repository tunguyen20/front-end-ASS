import { count } from 'console'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cartController } from '../../controller/CartController'
import { productController } from '../../controller/ProductController'
import { Cart, orderProduct } from '../../model/Cart'
import { Product } from '../../model/Product'
import "./ProductDetail.css"

export default function ProductDetails() {
    const { id } = useParams()
    const [data, setData] = useState<Product>()
    const [quantity, setQuatity] = useState<number>(1)
    useEffect(() => {
        productController.detail(String(id)).then(res => {
            setData(res)
        })
    }, [id])


    const onAddCart = () => {
        // let CartProducts: Cart[] = [];
        // let JSONCart = localStorage.getItem("Carts")
        // if (JSONCart != null) {
        //     CartProducts = JSON.parse(JSONCart)
        // }
        // let check: boolean = true

        // for (let i = 0; i < CartProducts.length; i++) {
        //     if (CartProducts[i].idProduct == data?.idProduct) {
        //         CartProducts[i].quantity = CartProducts[i].quantity + quantity
        //         check = false
        //     }
        // }
        // if (check == true) {
        //     let product: Cart = {
        //         idProduct: Number(data?.idProduct),
        //         img: String(data?.img),
        //         name: String(data?.name),
        //         quantity: quantity,
        //         price: Number(data?.price)
        //     }
        //     CartProducts.push(product)
        // }

        // localStorage.setItem("Carts", JSON.stringify(CartProducts))
        let orderProduct: orderProduct = { idProduct: String(data?.idProduct), price: Number(data?.price), quantity: Number(quantity) }
        cartController.addCart(orderProduct, "1")

    }

    const onPlus = () => {
        setQuatity(quantity + 1)

    }
    const onMinus = () => {
        if (quantity > 1) {
            setQuatity(quantity - 1)
        }

    }
    return (
        <div>
            <section className="productDetail">
                <div className="leftDetail">
                    <div className="img">
                        <div className="imgProduct"> <img src={data?.img} alt="" />  </div>
                    </div>

                </div>
                <div className="rightDetail">
                    <h2><b>{data?.name}</b></h2>
                    <h1>{String(data?.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <u>đ</u> </h1>
                    <div className="quantityControl">
                        <button className='btnMinus' onClick={onMinus} >-</button>
                        <button >{quantity}</button>
                        <button className='btnPlus' onClick={onPlus} >+</button>
                        {/* <input type="number" min="1" onChange={e => { setQuatity(Number(e.target.value)) }} /> */}

                    </div>
                    <button className='btnAddCart' onClick={onAddCart}><b>THÊM VÀO GIỎ</b> </button>
                </div>
            </section>

        </div>
    )
}
