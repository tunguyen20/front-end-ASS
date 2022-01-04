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
    const [numberPage, setNumberPage] = useState<number[]>([]);
    const [indexPage, setIndexPage] = useState<number>(1);
    const [input, setInput] = useState<string>("");
    useEffect(() => {
        productController.list("", 1, 3).then(res => {
            setData(res.dataPage)
            setNumberPage(res.arrPageNumber)
        });
    }, [])


    const remove = (id: string) => {
        productController.delete(id)
        productController.list("", 1, 3).then(res => {
            setData(res.dataPage)
            setNumberPage(res.arrPageNumber)
            setIndexPage(1)
        });
    }

    const add = (product: Product) => {
        if (dataShowForm.idProduct != 0) {
            productController.update(product)
            productController.list("", indexPage, 3).then(res => {
                setData(res.dataPage)
                setNumberPage(res.arrPageNumber)
                setIndexPage(indexPage)
                search(input)
            });
        }
        else {
            product.idProduct =uuidv4()
            productController.add(product)
            
             productController.list("", 1, 3).then(res => {
                setData(res.dataPage)
                setNumberPage(res.arrPageNumber)
                setIndexPage(1)
            });
        }
        setDataFrorm({ idProduct: 0, img: "", price: 0, name: "" })
       
    }


    const onEdit = (product: Product) => {
        setDataFrorm(product)
    }
    let onNumberPage = (id: number) => {
        if (input == "") {
            productController.list("", id, 3).then(res => {
                setData(res.dataPage)
                setIndexPage(id)
                setNumberPage(res.arrPageNumber)
            })
        } else {
            productController.list(input, id, 3).then(res => {
                setData(res.dataPage)
                setNumberPage(res.arrPageNumber)
                setIndexPage(id)
            })
        }

    }
    let onBev = () => {
        if (indexPage > 1) {
            onNumberPage(indexPage - 1)
            setIndexPage(indexPage - 1)
        }
    }
    let onNext = () => {
        if (indexPage < numberPage.length) {
            onNumberPage(indexPage + 1)
            setIndexPage(indexPage + 1)
        }
    }
    let search = (input: string) => {
        if (input != "") {
            productController.list(input, 1, 3).then(res => {
                setData(res.dataPage)
                setNumberPage(res.arrPageNumber)
                setInput(input)
                setIndexPage(1)
            })
        } else {
            productController.list("", 1, 3).then(res => {
                setData(res.dataPage)
                setNumberPage(res.arrPageNumber)
                setIndexPage(1)
                setInput("")
            })
        }
    }
    return (


        <div className="warehouse">
            <FormWareHouse key={uuidv4()} onAdd={add} dataForm={dataShowForm}></FormWareHouse>

            <div className="right">

                <h2 className="rightItem">Danh sách sản phẩm trong kho</h2>
                <div>
                    <input value={input}type="text" style={{ marginLeft: "35%", marginTop: "10px", width: "30%", height: "30px" }} onChange={e => search(e.target.value)} placeholder='Search.....' />
                </div>
                <WareHouseProducts onEdit={onEdit} onDelete={remove} product={data} ></WareHouseProducts>
                <div style={{ textAlign: "center", padding: "20px" }} className="paginatinonProduct">
                    <button className={indexPage == 1 ? "activeBev" : ""} style={{ padding: "10px 20px", marginLeft: "10px", border: "0", borderRadius: "100px" }} onClick={onBev}>pev</button>

                    {numberPage.map((item, index) => (
                        <button className={indexPage == index + 1 ? "indexPage" : ''} key={index} style={{ padding: "10px 20px", marginLeft: "10px", borderRadius: "100px", border: "0" }} onClick={() => { onNumberPage(index + 1) }}>{index + 1}</button>
                    ))}
                    <button className={indexPage == numberPage.length ? "activeNext" : ""} style={{ padding: "10px 20px", marginLeft: "10px", borderRadius: "100px", border: 0 }} onClick={onNext}>next</button>
                </div>
            </div>

        </div>
    )
}
