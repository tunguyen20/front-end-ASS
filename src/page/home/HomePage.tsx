

import Banner from "./Banner"
import "./Homepage.css"

import {Phone} from "../../model/Product"
import Videoreview from "./Videoreview"
import Products from "./Products"
export default function HomePage() {


    
    return (
        <div>
            <Banner></Banner>
           
           <Products></Products>

           <Videoreview></Videoreview>
        </div>
    )
}
