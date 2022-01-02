import React, { useState } from 'react'
import { Phone, Product } from '../../model/Product'
import WareProduct from './WareHouseProduct'

interface Props {
    onDelete: (id: string) => void
    onEdit: (product: Product) => void
  
    product: Product[]
};

export default function WareHouseProducts(props: Props) {
    return (
        <div className="showProductCart">
           
            {props.product.map((item, index) => (
                <WareProduct key={index} product={item} onEdit={() => props.onEdit(item)} onDelete={() => props.onDelete(String(item.idProduct))} ></WareProduct>))}

        </div>

    )
}
