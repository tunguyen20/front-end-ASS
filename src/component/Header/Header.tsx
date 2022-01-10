import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';
import { userContext } from '../../context/UserContext';
import { authAxios } from '../../controller';


import "./Header.css"

export default function Header() {
    const { name,onSetName } = useContext(userContext);
    const { onSetQuantity } = useContext(CartContext);
    const {quantity}= useContext(CartContext)
    const logout=()=>{
        
        localStorage.removeItem("jwt");

        onSetName("")
        onSetQuantity(0)
        authAxios.defaults.headers.common['Authorization'] = ""
    }
    return (
        <div>
            <header className="header">
                <nav className="navBar">
                    <div className="inforUser">
                       
                        <p ><b>{name}</b></p>
                        <Link onClick={logout} to="/login"> {name!=""?<i className="fas fa-sign-out-alt"></i>:<i className="fas fa-sign-in-alt"></i>}</Link>
                    </div>
                    <div className="logo">
                        <a><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2019/05/logo-mona.png" alt="" /></a>
                    </div>
                    <div className="login">
                      
                        <Link to={"/cart"} className="cartIcon"><i className="fas fa-shopping-cart">  <span>{quantity==-1?"":quantity}</span></i></Link>
                       
                        <Link to={"/order"} className="listOrderIcon"><i className="fas fa-list-ul"></i></Link>
                    </div>
                </nav>
                <div className="menu">
                    <ul className="menuitem">
                        <Link to="/home">Trang chủ</Link>
                    </ul>
                    <ul className="menuitem">
                        <a className="nu">NỮ</a>
                        <ul className="menuNu">
                            <li className="tieuDeCap2">
                                <a className="tieuDeMucCap2">Classic</a>
                            </li>
                            <li className="tieuDeCap2">
                                <a className="tieuDeMucCap2">Sunbanked</a>
                            </li>
                            <li className="tieuDeCap2">
                                <a className="tieuDeMucCap2">Chuck 07s </a>
                            </li>
                            <li className="tieuDeCap2">
                                <a className="tieuDeMucCap2">One Star </a>
                            </li>
                            <li className="tieuDeCap2">
                                <a className="tieuDeMucCap2">PSY-Kicks </a>
                            </li>
                        </ul>
                    </ul>
                    <ul className="menuitem">
                        <a className="nam">NAM</a>
                        <ul className="menuNu">
                            <li className="tieuDeCap2">
                                <a className="tieuDeMucCap2">Classic</a>
                            </li>
                            <li className="tieuDeCap2">
                                <a className="tieuDeMucCap2">Sunbanked</a>
                            </li>
                            <li className="tieuDeCap2">
                                <a href="sanpham.html" className="tieuDeMucCap2">Chuck 07s </a>
                            </li>
                            <li className="tieuDeCap2">
                                <a className="tieuDeMucCap2">One Star </a>
                            </li>
                            <li className="tieuDeCap2">
                                <a className="tieuDeMucCap2">PSY-Kicks </a>
                            </li>
                        </ul>
                    </ul>
                    <ul className="menuitem">
                        <a className="treEm">TRẺ EM </a>
                    </ul>
                    <ul className="menuitem">
                        <a className="phuKienKhac">PHỤ KIỆN KHÁC</a>
                    </ul>
                    <ul className="menuitem">
                        <a className="tienTuc">TIN TỨC</a>
                    </ul>
                    <ul className="menuitem">
                        <a className="lienHe">LIÊN HỆ</a>
                    </ul>
                </div>
            </header>
        </div>
    )
}
