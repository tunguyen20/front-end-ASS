import React, { useEffect, useState, createContext, useContext } from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';

import WareHousePage from './page/warehouse/WareHousePage';
import HomePage from './page/home/HomePage';

import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import ProductDetails from './page/productDetails/ProductDetails';
import Cartpage from './page/cart/Cartpage';
import "./App.css"
import HistoryOrderPage from './page/order/HistoryOrderPage';
import LoginPage from './page/login/LoginPage';
import { userController } from './controller/UserController';

import UserContextProvider, { userContext } from './context/UserContext';
import CartContextProvider from './context/CartContext';


function App() {
  const {idUser,onSetIdUser}= useContext(userContext) 
  
 
 
  return (

    <BrowserRouter>
      <UserContextProvider>
        <CartContextProvider>
          <Header></Header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/warehouse" element={<WareHousePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cartpage />} />
            <Route path="/order" element={<HistoryOrderPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </CartContextProvider>
      </UserContextProvider>
      <Footer></Footer>
    </BrowserRouter>

  );
}

export default App;
