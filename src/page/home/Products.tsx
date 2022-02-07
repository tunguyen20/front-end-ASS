import { type } from 'os';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { productController } from '../../controller/ProductController';

import { BookLineProps, getDataLocal, Product } from '../../model/Product'

import { ProductHome } from './Product'
import { Stack } from '@mui/material';
import SliderBestSeller from './SliderBestSeller';


export default function Products() {

    const [dataListBooks, setDataListBooks] = useState<BookLineProps[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    useEffect(() => {
        LoadList("", 1,5)
    }, [])
    const LoadList = (search: string, page: number, pageSize: number) => {
        productController.list(search, page, pageSize).then(res => {
            setPageCount(Math.ceil(res.pageCount/pageSize));
            setDataListBooks(res.listBook)
        })
    }
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        console.log(value);
        
        LoadList("", value ,5)
        
    };

    return (
        <div className="Books">
            <div className="ListBook">
                <p className="title">
                    New arrivals
                </p>
                <h2 className="titleList">
                    NEW & UPCOMING RELEASES
                </h2>

                <div className="conTainerBooks">
                    {/* {
                        dataListBooks.map((item, index) => (
                            <ProductHome ListBook={item} key={index} />
                        ))
                    } */}

                <SliderBestSeller/>
                </div>
                {/* <Stack spacing={2} style={{ alignItems: "center"}}>
                    <Pagination   variant="outlined" color="primary" count={pageCount} page={page} onChange={handleChange} />
                </Stack> */}


            </div>
        </div>
    )
}
