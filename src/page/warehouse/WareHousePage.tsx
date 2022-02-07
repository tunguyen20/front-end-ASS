import axios from 'axios'
import React, { useEffect, useState } from 'react'
import WarehouseLeft from './LeftWareHouse'
import WarehouseRight from './RightWareHouse'


import "./WareHousePage.css"

const { v4: uuidv4 } = require("uuid")

export default function WareHouse() {
    return (
        <div className="warehouse">
          
            <WarehouseRight/>

        </div>
    )
}
