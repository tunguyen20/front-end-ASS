import React, { useEffect, useState, createContext, useContext } from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';

import WareHousePage from './page/warehouse/WareHousePage';

import "./App.css"
import Header from './component/Header/Header';
import Banner from './page/home/Banner';
import HomePage from './page/home/HomePage';
import ProductDetails from './page/productDetails/ProductDetails';
import UserContextProvider from './context/UserContext';
import CartContextProvider, { CartContext } from './context/CartContext';
import CartPage from './page/cart/CartPage';
import Footer from './component/Footer/Footer';
import { Search } from '@mui/icons-material';
import SearchPage from './page/searchPage/SearchPage';
import FormLogin from './component/Header/FormLogin';
import OrderPage from './page/order/HistoryOrderPage';
import HomeLayout from './page/homeLayout/HomeLayout';
import AdminLayout from './page/adminLayout/AdminLayout';



function App() {


  return (

    <BrowserRouter>
      <UserContextProvider>
        <CartContextProvider>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={
              <HomeLayout>
                <HomePage />
              </HomeLayout>
            } />
            <Route path="/home" element={
              <HomeLayout>
                <HomePage />
              </HomeLayout>} />


            <Route path="/warehouse" element={
              <AdminLayout>
                <WareHousePage />
              </AdminLayout>
            } />


            <Route path="/book/:id" element={
              <HomeLayout>
                <ProductDetails />
              </HomeLayout>
            } />
            <Route path="/cart" element={
              <HomeLayout>
                <CartPage />
              </HomeLayout>} />

            <Route path="/search" element={
              <HomeLayout>
                <SearchPage />
              </HomeLayout>
            } />

            <Route path="/order" element={
              <HomeLayout>
                <OrderPage />
              </HomeLayout>
            } />
          </Routes>

        </CartContextProvider>
      </UserContextProvider>


    </BrowserRouter >

  );
}

export default App;
