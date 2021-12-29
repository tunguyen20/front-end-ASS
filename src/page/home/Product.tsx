import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../../model/Product'


interface Props {
    product: Product
};

let path="/product"
export function ProductHome(prop: Props) {

    return (
        <div className="product" >
            <Link to={"/product" + `/${prop.product.idProduct}`}>  
            <div className="hinhAnh">
              <img src={prop.product.img} alt="" />
            </div>
            <div className="thongTinSP">
                <div className="ten">
                    <p style={{color:"black"}}>{prop.product.name}</p>
                </div>

                <div className="gia">
                    <p>{String(prop.product.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₫</p>
                </div>
            </div>
            </Link>
        </div>
    )
}
