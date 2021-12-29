import { type } from 'os';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { productController } from '../../controller/ProductController';

import { getDataLocal, Product } from '../../model/Product'

import { ProductHome } from './Product'


export default function Products() {
    const [data, setdata] = useState<Product[]>([]);
    const [numberPage, setNumberPage] = useState<number[]>([]);
    const [indexPage, setIndexPage] = useState<number>(1);
    const [input, setInput] = useState<string>("");
    useEffect(() => {
        // productController.pagination(1).then(res => {
        //     setdata(res.dataPage)
        //     setNumberPage(res.arrPagenumber)
        // })
        productController.list("", 1, 4).then(res => {
            setdata(res.dataPage)
            setNumberPage(res.arrPagenumber)
        })

    }, [])
    let onNumberPage = (id: number) => {
        if (input == "") {
            productController.list("", id, 4).then(res => {
                setdata(res.dataPage)
                setIndexPage(id)
                setNumberPage(res.arrPagenumber)
            })
        } else {
            productController.list(input, id, 3).then(res => {
                setdata(res.dataPage)
                setNumberPage(res.arrPagenumber)
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
                setdata(res.dataPage)
                setNumberPage(res.arrPagenumber)
                setInput(input)
                setIndexPage(1)
            })
        } else {
            productController.list("", 1, 4).then(res => {
                setdata(res.dataPage)
                setNumberPage(res.arrPagenumber)
                setIndexPage(1)
                setInput("")
            })
        }

    }


    return (
        <div className="allProduct">
            <input className='searchInput' type="text" onChange={e => search(e.target.value)} placeholder='Search.....' />
            {data.map((item, index) => (<ProductHome key={index} product={item}  ></ProductHome>))}


            <div style={{ textAlign: "center", padding: "20px" }} className="paginatinonProduct">
                <button className={indexPage == 1 ? "activeBev" : ""} style={{ padding: "10px 20px", marginLeft: "10px", border: "0", borderRadius: "100px" }} onClick={onBev}>bev</button>

                {numberPage.map((item, index) => (
                    <button className={indexPage == index + 1 ? "indexPage" : ''} key={index} style={{ padding: "10px 20px", marginLeft: "10px", borderRadius: "100px", border: "0" }} onClick={() => { onNumberPage(index + 1) }}>{index + 1}</button>
                ))}


                <button className={indexPage == numberPage.length ? "activeNext" : ""} style={{ padding: "10px 20px", marginLeft: "10px", borderRadius: "100px", border: 0 }} onClick={onNext}>next</button>
            </div>

        </div>
    )
}
