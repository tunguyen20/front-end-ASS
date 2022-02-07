
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { cartController } from '../../controller/CartController';
import { orderController } from '../../controller/OrderController';
import { productController } from '../../controller/ProductController';
import { User } from '../../model/User';

import { Carts } from '../../model/Cart';


import "./CartPage.css"
import CartPageProduct from './CartPageProduct';
import { userInfo } from 'os';
import { CartContext } from '../../context/CartContext';
import { userContext } from '../../context/UserContext';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from '@mui/material';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,
};

export default function Cartpage() {
    const navigate = useNavigate()
    const { ListCart, onLoadCarts } = useContext(CartContext)
    const { onSetOpenFormLogin, userInfor, onsetUserInfor } = useContext(userContext)
    const [infor, setInfo] = useState<User>(userInfor);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        setOpen(true)
         
    }

    let total = 0;

    useEffect(() => {
        if (userInfor.idUser == "") {
            onSetOpenFormLogin(true)
            setInfo(userInfor)
        }
        else {
            onSetOpenFormLogin(false)
            setInfo(userInfor)
        }
    }, [userInfor.idUser])
    ListCart.Cart.map((item, index)=> {
        total += item.price * item.quantity
    })
    const onPlus = (idOrderBook: string) => {
        onsetUserInfor()
        if (userInfor.idUser == "") {
            onLoadCarts()
            onSetOpenFormLogin(true)
        }
        else {
            cartController.savePlusQuantityBookCart(idOrderBook)
            onLoadCarts()
        }
       
    }
    const onMinus = (idOrderBook: string, quantity: number) => {
        if (quantity > 1) {
           
            onsetUserInfor()
            if (userInfor.idUser == "") {
                onLoadCarts()
                onSetOpenFormLogin(true)
            }
            else {
                cartController.saveMinusQuantityBookCart(idOrderBook)
                onLoadCarts()
            }
        }
    }
    const onDelete = (idOrderProduct: string) => {
        cartController.deleteProductCart(idOrderProduct).then(res => {
            onLoadCarts()
        }
        )

    }
    const onCheckout = () => {
        cartController.saveCheckout(infor, ListCart)
        setOpen(false)
        navigate("/order")
        
    }

    return (

        <div>
            <div className="cart">
                <div className="productCart">
                    <div>{ListCart.Cart[0].idOrderBook == "" ? <div><h1>Giỏ hàng trống</h1><img className='imgEmpty' src="https://beemall.io/search.png" alt="" /> <a href="/home">Home</a> </div> : ""}</div>
                    {ListCart.Cart.map((item, index) => (
                        item.idBook == "" ? "" :
                            <CartPageProduct key={index} itemCart={item} onPlus={onPlus} onMinus={onMinus} onDelete={onDelete} />
                    )
                    )}
                </div>

                <div className="checkOut">
                    <p className='totalTemp'>
                        Total : <span>{total} đ </span>
                    </p>
                    <Button disabled={infor.idUser == "" ? true : false} onClick={handleOpen}>Check Out</Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <Typography id="transition-modal-title" variant="h6" component="h2">

                                    <Stack
                                        direction="row"
                                        justifyContent="space-around"
                                        alignItems="baseline"
                                        spacing={2}
                                    >
                                        <div style={{ width: "480px" }}>
                                            <h2 style={{ textAlign: "center" }}>Delivery Address</h2>

                                            <TextField
                                                label="First name"
                                                variant="outlined"
                                                value={infor.firstName}
                                                id="outlined-start-adornment"
                                                onChange={e => { setInfo({ ...infor, firstName: e.target.value }) }}
                                                sx={{ m: 1, width: '20ch' }}
                                            />
                                            <TextField
                                                label="Last name"
                                                variant="outlined"
                                                value={infor.lastName}
                                                onChange={e => { setInfo({ ...infor, lastName: e.target.value }) }}
                                                id="outlined-start-adornment"
                                                sx={{ m: 1, width: '20ch' }}
                                            />
                                            <TextField
                                                label="Phone"
                                                variant="outlined"
                                                value={infor.phone}
                                                onChange={e => { setInfo({ ...infor, phone: e.target.value }) }}
                                                id="outlined-start-adornment"
                                                sx={{ m: 1, width: '20ch' }}
                                            />
                                            <TextField
                                                label="Email"
                                                variant="outlined"
                                                id="outlined-start-adornment"
                                                value={infor.email}
                                                onChange={e => { setInfo({ ...infor, email: e.target.value }) }}
                                                sx={{ m: 1, width: '20ch' }}
                                            />
                                            <TextField
                                                label="Address"
                                                variant="outlined"
                                                id="outlined-start-adornment"
                                                value={infor.address}
                                                onChange={e => { setInfo({ ...infor, address: e.target.value }) }}
                                                sx={{ m: 1, width: '20ch' }}
                                            />
                                            <TextField
                                                label="Postcode"
                                                variant="outlined"
                                                value={infor.postcode}
                                                onChange={e => { setInfo({ ...infor, postcode: e.target.value }) }}
                                                id="outlined-start-adornment"
                                                sx={{ m: 1, width: '20ch' }}
                                            />

                                        </div>

                                        <div className="detailCheckOu" style={{ display: "inline-block" }}>
                                            <h3 style={{ marginBottom: "20px" }}>Your order</h3>
                                            <div className="detailOrder" style={{ marginBottom: "20px " }}>
                                                <div className="priceOrder">
                                                    Price :{total}
                                                </div>
                                                <div className="deliveryOrder">
                                                    Delivery:
                                                    $0
                                                </div>

                                            </div>
                                            <Button onClick={() => onCheckout()} variant="contained">CheckOut</Button>
                                        </div>
                                    </Stack>
                                </Typography>


                            </Box>

                        </Fade>

                    </Modal>

                </div>


            </div>



        </div>


    )
}
