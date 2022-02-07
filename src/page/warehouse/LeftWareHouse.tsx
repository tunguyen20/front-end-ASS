import { count } from 'console';
import React, { useState } from 'react'
import { Product } from '../../model/Product';

export default function WarehouseLeft() {
  return (
    <div className="left">
      <div className="container">
        <div className="logo">
          <img src="https://wpbingosite.com/wordpress/tikie/wp-content/webp-express/webp-images/uploads/2021/05/logo-white.png.webp" alt="" />
        </div>
        <div className="menuWarehouse">
          <ul className='menuItem1'>Product</ul>
          <ul className='menuItem1'>User</ul>
 
       
        </div>
      </div>
    </div>
  )
}
