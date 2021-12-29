import React, { useState } from 'react'
import { Product } from '../../model/Product'

interface Props {
    onDelete: () => void
    onEdit: () => void
    product: Product
};


export default function WareProduct(props: Props) {
    return (
        <div className="product" >
            <div className="imageProduct">
                <img src={props.product.img} alt="" />
            </div>
            <div className="nameProduct">
                <p>{props.product.name}</p>
            </div>
            <div className="pireProduct">
                <p>{String(props.product.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</p>
            </div>
            <div className="editDel">
                <button className='editProduct' onClick={() => props.onEdit()}  >Sửa</button>
                <button className='deleteProduct' onClick={() => props.onDelete()}>Xóa</button>
            </div>
        </div>
    )
}
