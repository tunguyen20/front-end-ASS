import React, { useContext, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./Header.css"
import { useNavigate } from 'react-router-dom';
import { userController } from '../../controller/UserController';
import { authAxios } from '../../controller';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormLogin from './FormLogin';
import PublisherMenu from './PublisherMenu';
import CategoryMenu from './CategoryMenu';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SelectListCategory from './SelectListCategory';


export default function Header() {

    const [inputSearch, setInputSerch] = useState("")

    return (
        <div>
            <div className="headerWrapper">
                <div className="container">
                    <div className="row">
                        <div className="headerLogo">
                            <Link to="/home"><img width="395" height="100" src="https://wpbingosite.com/wordpress/tikie/wp-content/webp-express/webp-images/uploads/2021/05/logo-white.png.webp" alt="Tikie – Book Store WooCommerce WordPress Theme" data-lazy-src="https://wpbingosite.com/wordpress/tikie/wp-content/webp-express/webp-images/uploads/2021/05/logo-white.png.webp" data-ll-status="loaded" className="entered lazyloaded" /></Link>
                        </div>
                        <div className="headerSearchForm">
                            <div className="boxSearch">
                                <SelectListCategory />
                                <input onChange={e => setInputSerch(e.target.value)} type="text" placeholder='Search for books by keyword' />
                            </div>
                            <div className="BoxItemSearch">
                                <Link to={`/search?search=${inputSearch}`} > <BiSearchAlt /></Link>
                            </div>
                        </div>
                        <FormLogin />
                    </div>
                </div>
            </div>
            <div className="headerBottom">
                <div className="container">
                    <div className="row">
                        <div className="headerMenu">
                            <div className="itemMenu">
                                HOME
                                <KeyboardArrowDownIcon />
                            </div>
                            <div className="itemMenu">
                                SHOP
                                <KeyboardArrowDownIcon />
                            </div>
                            <div className="itemMenu">
                                PRODUCT
                                <KeyboardArrowDownIcon />
                            </div>

                            <div className="itemMenu">
                                BLOG
                                <KeyboardArrowDownIcon />
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
