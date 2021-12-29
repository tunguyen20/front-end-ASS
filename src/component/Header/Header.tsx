import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"

export default function Header() {
    return (
        
        <div>
            
            <header className="header">
                <nav className="navBar">
                    <div className="logo">
                        <a><img src="http://mauweb.monamedia.net/converse/wp-content/uploads/2019/05/logo-mona.png" alt="" /></a>
                    </div>
                    <div className="login">
                        <Link to={"/cart"} className="cartIcon"><i className="fas fa-shopping-cart"></i></Link>
                        <Link to={"/order"} className="listOrderIcon"><i className="fas fa-list-ul"></i></Link>
                    </div>
                </nav>
                <div className="menu">
                    <ul className="menuitem">
                    <Link to="/home">TRANG CHỦ</Link>
                    </ul>
                    <ul className="menuitem">
                        <a className="nu">NỮ</a>
                      <ul className="menuNu">
                            <li className="tieuDeCap2">
                                <a  className="tieuDeMucCap2">Classic</a>
                            </li>
                            <li className="tieuDeCap2">
                                <a  className="tieuDeMucCap2">Sunbanked</a>
                            </li>
                            <li className="tieuDeCap2">
                                <a  className="tieuDeMucCap2">Chuck 07s </a>
                            </li>
                            <li className="tieuDeCap2">
                                <a  className="tieuDeMucCap2">One Star </a>
                            </li>
                            <li className="tieuDeCap2">
                                <a  className="tieuDeMucCap2">PSY-Kicks </a>
                            </li>
                        </ul>
                    </ul>
                    <ul className="menuitem">
                        <a  className="nam">NAM</a>
                      <ul className="menuNu">
                            <li className="tieuDeCap2">
                                <a  className="tieuDeMucCap2">Classic</a>
                            </li>
                            <li className="tieuDeCap2">
                                <a  className="tieuDeMucCap2">Sunbanked</a>
                            </li>
                            <li className="tieuDeCap2">
                                <a href="sanpham.html" className="tieuDeMucCap2">Chuck 07s </a>
                            </li>
                            <li className="tieuDeCap2">
                                <a  className="tieuDeMucCap2">One Star </a>
                            </li>
                            <li className="tieuDeCap2">
                                <a  className="tieuDeMucCap2">PSY-Kicks </a>
                            </li>
                        </ul>
                    </ul>
                    <ul className="menuitem">
                        <a  className="treEm">TRẺ EM </a>
                    </ul>
                    <ul className="menuitem">
                        <a  className="phuKienKhac">PHỤ KIỆN KHÁC</a>
                    </ul>
                    <ul className="menuitem">
                        <a  className="tienTuc">TIN TỨC</a>
                    </ul>
                    <ul className="menuitem">
                        <a  className="lienHe">LIÊN HỆ</a>
                    </ul>
                </div>
            </header>
        </div>
    )
}
