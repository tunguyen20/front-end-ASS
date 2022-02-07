import { Rating } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { BookLineProps, Product } from '../../model/Product'

interface Props {
    ListBook: BookLineProps
}

export function ProductHome(props: Props) {
    let priceNew = -1
    let priceOld = -1
    props.ListBook.book.map((item, index) => {
        item.state == true ? priceNew = item.price : priceOld = item.price
    })
    return (
        <div className="itemBook">

            <Link to={"/book" + `/${props.ListBook.idBookLine}`}>
                <div className="imgBook" key={props.ListBook.media[0].idImage}>
                    <img src={props.ListBook.imageBookCover} alt="" />
                </div>
            </Link>
            <div className="nameBook">
                <p>{props.ListBook.bookTitle}</p>
            </div>
            <div className="authorBook">
                <p>by: <span>{props.ListBook.bookAuthor}</span></p>
            </div>
            <div className="priceBook">
                <p>${
                    priceNew}{
                        priceNew != -1 && priceOld != -1 ? " – " : ""
                    }${
                        priceOld}  </p>
                         <Rating style={{ fontSize: "19px" }} name="half-rating" defaultValue={4.5} precision={0.5} />
            </div>
        </div>
    )
}
