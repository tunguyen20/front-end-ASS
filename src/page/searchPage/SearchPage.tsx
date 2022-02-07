import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import "./SearchPage.css"
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Stack } from "@mui/material";
import { ProductHome } from "../home/Product";
import { BookLineProps, Category } from "../../model/Product";
import { productController } from "../../controller/ProductController";
import Slider1 from '@mui/material/Slider';


export default function SearchPage() {

    let [searchParam] = useSearchParams()
    const search = searchParam.get("search");
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,

        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const [dataListBooks, setDataListBooks] = useState<BookLineProps[]>([])
    const [pageCount, setPageCount] = useState<number>(0)
    const [bookCount, setBookCount] = useState<number>(0)
    const [listCategory, setListCategory] = React.useState<Category[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [idCategory, setIdCategory] = React.useState<string>("");
    const [sortBy, setSortBy] = React.useState<string>("");

    const [valueSliderPrice, setValueSliderPrice] = React.useState<number[]>([0, 350]);

    useEffect(() => {
        LoadList(String(search), "", "", valueSliderPrice[0], valueSliderPrice[1], 1, 8)
    }, [search])
    const LoadList = (search: string, idCategory: string, sortBy: string, minPrice: number, maxPrice: number, page: number, pageSize: number) => {
        productController.search(search, idCategory, sortBy, valueSliderPrice[0], valueSliderPrice[1], page, pageSize).then(res => {
            setPageCount(Math.ceil(res.bookCount / pageSize));
            setBookCount(res.bookCount)
            setDataListBooks(res.listBook)
          
        })
    }
    React.useEffect(() => {
        productController.getListCategory().then(res => {
            setListCategory(res)
        })
    }, [])
    const onCategorySearch = (idCategory: string) => {
        console.log(idCategory);
        setIdCategory(idCategory)
        LoadList(String(search), idCategory, "", valueSliderPrice[0], valueSliderPrice[1], 1, 8)
        setSortBy("")
    }
    const handleSelectSort = (event: SelectChangeEvent) => {
        const sortBy = event.target.value as string;
        setSortBy(sortBy)
        LoadList(String(search), idCategory, sortBy, valueSliderPrice[0], valueSliderPrice[1], 1, 8)
    };
    const handleChange = (event: Event, newValue: number | number[]) => {
        let newValue1: number[] = newValue as number[]
        setValueSliderPrice(newValue as number[]);
        LoadList(String(search), idCategory, sortBy, newValue1[0], newValue1[1], 1, 8)
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        LoadList(String(search), idCategory, sortBy, valueSliderPrice[0], valueSliderPrice[1], value, 8)
        setPage(value)
    };
console.log(dataListBooks.length);

    return (

        <div className="searchPage">
            <div className="sliderCategory">
                <div className="" style={{ width: "800px", margin: "auto", textAlign: "center" }}>
                    <div>
                        <h1> Shop </h1>
                        {
                            search == "" ? "" : <p className="searchFor">Search results for “{search}”</p>
                        }

                        <Slider {...settings}>

                            <div className="imgCategory">

                                <img src="https://wpbingosite.com/wordpress/tikie/wp-content/webp-express/webp-images/uploads/2021/05/Image-1.jpg.webp" alt="" />
                                <h4>CHILDREN'S BOOKS
                                </h4>

                            </div>
                            <div className="imgCategory">
                                <a href="">
                                    <img src="https://wpbingosite.com/wordpress/tikie/wp-content/webp-express/webp-images/uploads/2021/05/Image-7.jpg.webp" alt="" />
                                    <h4>FAIRYTALE
                                    </h4>
                                </a>
                            </div>
                            <div className="imgCategory">
                                <a href="">
                                    <img src="https://wpbingosite.com/wordpress/tikie/wp-content/webp-express/webp-images/uploads/2021/05/Image-5.jpg.webp" alt="" />
                                    <h4>HEALTH & DIETING
                                    </h4>
                                </a>
                            </div>
                            <div className="imgCategory">
                                <a href="">
                                    <img src="https://wpbingosite.com/wordpress/tikie/wp-content/webp-express/webp-images/uploads/2021/05/Image-4.jpg.webp" alt="" />
                                    <h4>HORROR
                                    </h4>
                                </a>
                            </div>
                            <div className="imgCategory">
                                <a href="">
                                    <img src="https://wpbingosite.com/wordpress/tikie/wp-content/webp-express/webp-images/uploads/2021/05/Image-2.jpg.webp" alt="" />
                                    <h4>LOVE STORY
                                    </h4>
                                </a>
                            </div>
                            <div className="imgCategory">
                                <a href="">
                                    <img src="https://wpbingosite.com/wordpress/tikie/wp-content/webp-express/webp-images/uploads/2021/05/Image-6.jpg.webp" alt="" />
                                    <h4>MIRACLE
                                    </h4>
                                </a>
                            </div>
                            <div className="imgCategory">
                                <a href="">
                                    <img src="https://wpbingosite.com/wordpress/tikie/wp-content/webp-express/webp-images/uploads/2021/05/Image-3.jpg.webp" alt="" />
                                    <h4>TRAVEl
                                    </h4>
                                </a>
                            </div>



                        </Slider>
                    </div>
                </div>
            </div>
            <div className="containerSearch">
                <div className="filterBook">
                    <h4>CATEGORIES</h4>
                    <div className="category">
                        <button onClick={() => onCategorySearch("")} className={idCategory == "" ? "indexCategory itemCategory" : "itemCategory"}>
                            All Category
                        </button>
                        {listCategory.map((item, index) => (
                            <button onClick={() => onCategorySearch(item.idCategory)} className={idCategory != item.idCategory ? "itemCategory" : "indexCategory itemCategory  "}>
                                {item.nameCategory}
                            </button>
                        ))}

                    </div>
                    <div className="filterPrice" style={{ marginTop: "20px" }}>
                        <p className="tilterPrice">
                            PRICE
                        </p>
                        <Box sx={{ width: 250, borderTop: "1px solid black", padding: "10px 5px" }}>
                            <Slider1
                                getAriaLabel={() => 'Temperature range'}
                                value={valueSliderPrice}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                min={0}
                                color="secondary"
                                max={350}
                            />
                        </Box>
                        <div className="textPrice">
                            Range : ${valueSliderPrice[0]} - ${valueSliderPrice[1]}
                        </div>
                    </div>
                </div>


                <div className="ListBookSearch">
                    <div className="titleListBookSearch">
                        <div className="showNumberBookSearch">
                            <p>Showing {(page - 1) * 8 + 1}–{
                                ((page) * 8) > dataListBooks.length ? String(bookCount) : ((page) * 8)

                            } of {bookCount} item(s)</p>
                        </div>
                        <div className="shortSearch">
                            <FormControl sx={{ m: 1, minWidth: 240 }}>
                                <InputLabel id="demo-simple-select-label"> Sorting</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sortBy}
                                    label=" Sorting"
                                    onChange={handleSelectSort}
                                >
                                    <MenuItem value={"ORDER BY  b.price  asc"}>Sort By Price: Low To High</MenuItem>
                                    <MenuItem value={"ORDER BY  b.price  desc"}>Sort By Price: High To Low</MenuItem>
                                    <MenuItem value={`ORDER BY  bl."createdAt"  desc`}>Sort By Latest</MenuItem>
                                    <MenuItem value={`ORDER BY  bl."bookTitle" `}>Sort By Name: A - Z</MenuItem>
                                    <MenuItem value={`ORDER BY  bl."bookTitle"  desc `}>Sort By Name: Z - A</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="listContainerBook">
                        <div className="conTainerBooks">
                            {
                                dataListBooks.map((item, index) => (
                                    <ProductHome ListBook={item} key={index} />
                                ))
                            }
                        </div>
                        <div className="paginationSearch" >
                            <Stack spacing={1} >
                                <Pagination style={{ margin: "auto" }} count={pageCount} onChange={handleChangePage} variant="outlined" shape="rounded" />
                            </Stack>
                        </div>
                    </div>

                </div>
            </div>
        </div>



    )
}
