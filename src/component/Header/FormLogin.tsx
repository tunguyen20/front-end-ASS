import React, { useContext, useState } from 'react';
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
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { userController } from '../../controller/UserController';
import { authAxios } from '../../controller';
import { userContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #00000050',
    boxShadow: 24,
    p: 4,
};
export default function FormLogin() {
    const { onsetUserInfor, openFormLogin, onSetOpenFormLogin } = useContext(userContext);
    const { ListCart } = useContext(CartContext);
    const [indexTabLogin, setIndexTabLogin] = React.useState('1');
    const [open, setOpen] = React.useState(openFormLogin);
    const [userName, setUserName] = useState("admin")
    const [password, setPassword] = useState("admin")
    const [checkLoginResult, setCheckLoginResult] = useState(true)

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setCheckLoginResult(true)
        onSetOpenFormLogin(false)
        setIndexTabLogin("1")
    }
    const handleChange = (newValue: string) => {
        setIndexTabLogin(newValue);
    };
    useEffect(() => {
        setOpen(openFormLogin)
    }, [openFormLogin])
    const { userInfor } = useContext(userContext);
    const checkLogin = () => {
        userController.CheckLogin(userName, password).then(res => {
            console.log(res);
            if (res != "false") {
                localStorage.setItem("jwt", res)
                authAxios.defaults.headers.common['Authorization'] = res
                handleClose()
            }
            else {
                setCheckLoginResult(false)
            }
            onsetUserInfor()
        })
    }
    return (
        <div className="headerPageLink">
            <div className="loginHeader">
                <p onClick={handleOpen} className="activeLogin">
                    <FaUserAlt />
                </p>
                
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <div className="containerLoginRegister">
                                <TabContext value={indexTabLogin}>
                                    <div className="containerLogin">
                                        <TabPanel value="1" >
                                            <p className='titleLogin'>SIGN IN</p>
                                            <p className={checkLoginResult==false?"errLogin":""} style={{display:"none"}} >Username/password is not correct</p>
                                            <div>
                                                <TextField
                                                    label="UserName"
                                                    onChange={e => setUserName(e.target.value)}
                                                    variant="outlined"
                                                    id="outlined-start-adornment"
                                                    sx={{ m: 1, width: '41ch' }}
                                                />
                                            </div>
                                            <div>

                                                <TextField
                                                    label="Password"
                                                    variant="outlined"
                                                    onChange={e => setPassword(e.target.value)}
                                                    id="outlined-start-adornment"
                                                    sx={{ m: 1, width: '41ch' }}
                                                />

                                            </div>
                                            <button className='btnLogin' onClick={checkLogin}>LOGIN</button>
                                            <button className='btnCreactAcc' onClick={() => handleChange("2")}>Create An Account</button>
                                        </TabPanel>
                                    </div>
                                    <div className="containerRegister">
                                        <TabPanel value="2">
                                            <p className='titleRegister'> REGISTER</p>
                                            <div>

                                                <TextField
                                                    label="UserName"
                                                    variant="outlined"
                                                    id="outlined-start-adornment"
                                                    sx={{ m: 1, width: '41ch' }}
                                                />

                                            </div>
                                            <div>

                                                <TextField
                                                    label="Password"
                                                    variant="outlined"
                                                    id="outlined-start-adornment"
                                                    sx={{ m: 1, width: '41ch' }}
                                                />

                                            </div>
                                            <button className='btnRegister'>REGISTER</button>
                                            <button className='btnBackLogin' onClick={() => handleChange("1")}>Already has an account</button>
                                        </TabPanel>
                                    </div>
                                </TabContext>
                            </div>
                        </Box>

                    </Box>
                </Modal>
                <div style={{margin:"auto"}} className="contentText">
                    <p onClick={()=>setOpen(true)} className={userInfor.idUser!=""?"signHeader":""}  > {
                        userInfor.idUser==""?"Sign in":""
                    }
                    </p>
                    {/* <p className={userInfor.idUser==""?'logoutHeader':""} >Logout
                    </p> */}
                    <p >  {userInfor.firstName + "" + userInfor.lastName}</p>
                </div>
            </div>
            <div className="iconsCart">
                <Badge color="secondary" badgeContent={ListCart.Cart[0].idBook == "" ? "0" : ListCart.Cart.length} showZero>
                    <a className="activeCart">
                        <ShoppingBagIcon />
                    </a>
                </Badge>
                <div className="content-cart">
                    <Link to="/cart" className='textCart'>My Cart</Link>

                </div>
            </div>
        </div>

    )
}
