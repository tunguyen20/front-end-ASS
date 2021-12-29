import React from 'react';
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
import OrderPage from './page/order/OrderPage';
function App() {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/warehouse" element={<WareHousePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>

  );
}

export default App;
