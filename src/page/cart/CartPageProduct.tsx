import { useState } from "react";
import { Cart } from "../../model/Cart";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { RiDeleteBack2Line } from "react-icons/ri";
interface Props {
    itemCart: Cart
    onPlus: (id: string) => void
    onMinus: (id: string, quantity: number) => void
    onDelete: (id: string) => void
};


export default function CartPageProduct(props: Props) {
    return (
        <div className="content">
            <div className="img" >
                <img src={props.itemCart.imageBookCover} alt="" />

            </div>

            <div className="name item">
                <p>Name Book</p>
                {props.itemCart.bookTitle}
            </div>
            <div className="price item">
                <p>Price </p>
                {props.itemCart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

            </div>
            <div className="state item">
                <p>Status </p>
                {props.itemCart.state == true ? "New" : "Old"}

            </div>
            <div className="quantily item">
                <p>Quantity </p>
                <button onClick={() => props.onMinus(String(props.itemCart.idOrderBook), props.itemCart.quantity)} style={{ padding: "5px" }} >-</button>
                <button style={{ display: "inline-block", width: "50px", height: "30px" }}>{props.itemCart.quantity}</button>
                <button onClick={() => props.onPlus(String(props.itemCart.idOrderBook))} style={{ padding: "5px" }} >+</button>
            </div>
            <div className="total item">
                <p>Total </p>
                {(props.itemCart.price*props.itemCart.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

            </div>
            <div className="delete item">
                <p> Action</p>
                <button onClick={() => props.onDelete(props.itemCart.idOrderBook)}><RiDeleteBack2Line/></button>
            </div>
        </div>

    )
}