import { useState } from "react";
import { Cart } from "../../model/Cart";

interface Props {
    product: Cart
    onPlus: (quantily: number, id: number) => void
    onMinus: (quantily: number, id: number) => void
    onDelete: (id: number) => void
};


export default function CartPageProduct(props: Props) {
    return (
        <div className="content">
            <div className="img" >
                <img src={props.product.img} alt="" />
            </div>
            <div className="name item">
                <p>Sản phẩm</p>
                {props.product.name}
            </div>
            <div className="price item">
                <p>Đơn giá </p>
                {props.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div className="quantily item">
                <p>Số lượng </p>
                <button onClick={() => props.onMinus(props.product.quantity, props.product.idProduct)} style={{ padding: "5px" }} >-</button>
                <button style={{ display: "inline-block", width: "50px", height: "30px" }}>{props.product.quantity}</button>
                <button onClick={() => props.onPlus(props.product.quantity, props.product.idProduct)} style={{ padding: "5px" }} >+</button>
            </div>
            <div className="delete item">
                <p> Thao Tác</p>
                <button onClick={() => props.onDelete(props.product.idProduct)}><i className="fas fa-trash-alt"></i></button>
            </div>
        </div>

    )
}