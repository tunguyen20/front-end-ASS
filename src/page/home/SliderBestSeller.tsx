import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { productController } from '../../controller/ProductController';
import { BookLineProps } from '../../model/Product';
import { ProductHome } from './Product';
export default function SliderBestSeller() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5
    };
    const [dataListBooks, setDataListBooks] = useState<BookLineProps[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    useEffect(() => {
        LoadList("","",`ORDER BY  bl."createdAt"  desc`,0,0,1,10)
    }, [])
    const LoadList = (search: string, idCategory: string, sortBy: string, minPrice: number, maxPrice: number, page: number, pageSize: number) => {
        productController.search(search, idCategory, sortBy, minPrice, maxPrice, page, pageSize).then(res => {
           
            setDataListBooks(res.listBook)
        })
    }
  

    return (
        <div>

            <Slider {...settings}>

                {
                    dataListBooks.map((item, index) => (
                        <ProductHome ListBook={item} key={index} />
                    ))
                }


            </Slider>
        </div>
    )
}
