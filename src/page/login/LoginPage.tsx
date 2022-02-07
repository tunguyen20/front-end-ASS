
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { authAxios } from '../../controller'
import { userController } from '../../controller/UserController'

import '../login/LoginPage.css'

export default function LoginPage() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("admin")
    const [password, setPassword] = useState("admin")

    const checkLogin = () => {
        
        // userController.CheckLogin(userName, password).then(res => {
        //     if (res != "false") {
        //         localStorage.setItem("jwt", res)
        //         authAxios.defaults.headers.common['Authorization'] = res
        //         navigate('/home')
        //     }
        // })
    }

    return (

        <div className="formLogin">
            <div className="loginItem">
                <h2 id="formitem">Login</h2>
                <label htmlFor="userName">
                    <h4>Tên đăng nhập </h4>
                </label>
                <input type="text" placeholder="UserName" onChange={e => setUserName(e.target.value)} />

                <label htmlFor="password">
                    <h4>Password</h4>
                </label>
                <input type="password" id="priceProduct" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <button onClick={checkLogin} className='btnLogin' >Login</button>

            </div>
        </div>


    )
}
