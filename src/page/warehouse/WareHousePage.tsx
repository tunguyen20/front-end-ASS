import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { productController } from '../../controller/ProductController'
import { getDataLocal, Product, setDataLocal } from '../../model/Product'
import FormWareHouse from './FormWareHouse'
import "./WareHousePage.css"
import WareHouseProducts from './WareHouseProducts'
const { v4: uuidv4 } = require("uuid")

export default function WareHouse() {

    const [data, setData] = useState<Product[]>([]);
    const [dataShowForm, setDataFrorm] = useState<Product>({ idProduct: 0, img: "", price: 0, name: "" });

    useEffect(() => {
        productController.list("",1,7).then(res => {
            setData(res.dataPage)
        });
    }, [])


    const remove = (id: number) => {
        productController.delete(id).then(res => {
            setData(res)
        })

    }

    const add = (product: Product) => {
        if (dataShowForm.idProduct != 0) {
            productController.update(product).then(res => {
                setData(res)
            })
        }
        else {
            product.idProduct = Date.now()
            productController.add(product).then(res =>
                setData(res)
            )
        }
        setDataFrorm({ idProduct: 0, img: "", price: 0, name: "" })
    }


    const search = (input: string) => {

        if (input == "") {
            input = "null"
        }
        productController.list(input,1,4).then(res => {
            setData(res.dataPage)
        })
    }

    const onEdit = (product: Product) => {
        setDataFrorm(product)
    }
    return (


        <div className="warehouse">
            <FormWareHouse key={uuidv4()} onAdd={add} dataForm={dataShowForm}></FormWareHouse>
            <div className="right">

                <h2 className="rightItem">Danh sách sản phẩm trong kho</h2>
                <div>
                    <input type="text" style={{ marginLeft: "35%", marginTop: "10px", width: "30%", height: "30px" }} onChange={e => search(e.target.value)} placeholder='Search.....' />
                </div>
                <WareHouseProducts onEdit={onEdit} onDelete={remove} product={data} ></WareHouseProducts>
            </div>

        </div>
    )
}
