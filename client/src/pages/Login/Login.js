import React, { useState, useEffect } from 'react'
import "./Login.scss";
import "https://kit.fontawesome.com/64d58efce2.js";
// import LOGO from '../images/logo.svg'
import isEmpty from "validator/lib/isEmpty";
import { useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import axios from "../../api/admin/axios";
import ENDPOINT from "../../api/admin/endpoint";
import APP_CONSTANTS from "../../constants/appConstants";

import { login } from '../../api/admin/api';



function Login(props) {

    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validationMsg, setValidationMsg] = useState({})
    const [message, setMessage] = useState("")

    const response = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const token = localStorage.getItem('user')
        if (token) {
            if (response[0].role_id == 1) {
                history.replace('/dashboard') //./user
            } else if (response[0].role_id == 2) {
                history.replace('/userinfo')
            } else if (response[0].role_id == 3) {
                history.replace('/chu_cslt')
            } else if (response[0].role_id == 4) {
                history.replace('/account_nnn')
            }
        }
    })

    const onChangeUsername = (event) => {
        const value = event.target.value
        setEmail(value)
    }

    const onChangePassword = (event) => {
        const value = event.target.value
        setPassword(value)
    }

    const validateAll = () => {
        const msg = {}
        if (isEmpty(email)) {
            msg.email = "Vui lòng nhập email"
        } else if (!isEmail(email)) {
            msg.email = "Email không chính xác"
        }

        if (isEmpty(password)) {
            msg.password = "Vui lòng nhập mật khẩu"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const onSubmitLogin = async () => {
        // const isValid = validateAll()
        // if (!isValid) return

        // try {
        //     const params = {
        //         username: email,
        //         password: password
        //     }

        //     const res = await axios.post(ENDPOINT.LOGIN, params)
        //     if (res.data && res.data.messageCode === 1) {
        //         localStorage.setItem(APP_CONSTANTS.USER_TOKEN, res.data.result.access_token)
        //         setMessage("")
        //         history.replace('/admin')
        //     } else {
        //         setMessage(res.data.message)
        //     }

        // } catch (error) {
        //     console.log("api login error: ", error)
        // }


        const isValid = validateAll()
        if (!isValid) return
        try {
            let { data } = await login(email, password);
            console.log(data);
            if (data.success === 1) {
                // localStorage.setItem("accessToken", data.accessToken)
                localStorage.setItem("user", JSON.stringify(data.user))
                setMessage("");
                history.push({
                    pathname: '/dashboard',
                    state: { detail: data }
                });
                console.log('Success!!!');
            } else if (data.success === 2) {
                // localStorage.setItem("accessToken", data.accessToken)
                localStorage.setItem("user", JSON.stringify(data.user))
                setMessage("");
                history.push({
                    pathname: '/userinfo',
                    state: { detail: data }
                });
                console.log('Success!!!');
            } else if (data.success === 3) {
                // localStorage.setItem("accessToken", data.accessToken)
                localStorage.setItem("user", JSON.stringify(data.user))
                setMessage("");
                history.push({
                    pathname: '/chu_cslt',
                    state: { detail: data }
                });
                console.log('Success!!!');
            } else if (data.success === 4) {
                // localStorage.setItem("accessToken", data.accessToken)
                localStorage.setItem("user", JSON.stringify(data.user))
                setMessage("");
                history.push({
                    pathname: '/account_nnn',
                    state: { detail: data }
                });
                console.log('Success!!!');
            }
            else {
                console.log(data.message);
                setMessage(data.message)
            }
        } catch (e) {
            console.log('Lỗi Đăng Nhập: ', e.response);
        }
    }

    const changeState = () => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
        });
    }

    return (
        <div class="container">
            <div class="forms-container">
                <div class="signin-signup">
                    <form action="#" class="sign-in-form">
                        <h2 class="title">Đăng Nhập</h2>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input
                                type="email"
                                name='email'
                                id='email'
                                placeholder="email"
                                autoComplete="email"
                                onChange={onChangeUsername}
                            />
                        </div>
                        <p className="error-text">{validationMsg.email}</p>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input
                                type="password"
                                name="password"
                                id='password'
                                placeholder="Mật Khẩu"
                                autoComplete="password"
                                onChange={onChangePassword}
                            />
                        </div>
                        <p className="error-text">{validationMsg.password}</p>
                        <div className="error-text">{message}</div>
                        <button
                            type="button"
                            className="btn solid"
                            onClick={onSubmitLogin}
                        >
                            Đăng Nhập
                        </button>
                        <p class="social-text"></p>
                        <div class="social-media">
                            <a href="#" class="social-icon">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fab fa-google"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                    <form action="#" class="sign-up-form">
                        <h2 class="title">Đăng Ký</h2>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" placeholder="Họ Tên" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" placeholder="Mật Khẩu" />
                        </div>
                        <input type="submit" class="btn" value="Đăng Ký" />
                        <p class="social-text"></p>
                        <div class="social-media">
                            <a href="#" class="social-icon">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fab fa-google"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div class="panels-container">
                <div class="panel left-panel">
                    <div class="content">
                        {/* <h3>Tạo Mới Tài Khoản!</h3> */}
                        <h3>Hệ Thống Hỗ Trợ Quản Lý Lưu Trú Người Nước Ngoài</h3>
                        <br />
                        <h3>Tại Thành Phố Đà Nẵng</h3>

                        <p>
                        </p>
                        {/* <button class="btn transparent" id="sign-up-btn" onClick={changeState} >
                            Đăng Ký
                        </button> */}
                    </div>
                    <img src="" class="image" alt="" />
                </div>
                <div class="panel right-panel">
                    <div class="content">
                        <h3>Đã Có Tài Khoản!</h3>
                        <p>

                        </p>
                        <button class="btn transparent" id="sign-in-btn" >
                            Đăng Nhập
                        </button>
                    </div>
                    <img src="" class="image" alt="" />
                </div>
            </div>
        </div>
    )
}
export default Login;

// import React from 'react';

// import Profile from './Profile';
// export default class Login extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             "username": "",
//             "password": "",
//             isLogin: localStorage.getItem("accessToken") != null
//         }
//     }
//     setParams = (event) => {
//         this.setState({ [event.target.name]: event.target.value })
//     }

//     login = () => {
//         var myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//         var urlencoded = new URLSearchParams();
//         urlencoded.append("email", this.state.username);
//         urlencoded.append("password", this.state.password);

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded,
//             redirect: 'follow'
//         };

//         fetch("http://localhost:3000/api/users/login", requestOptions)
//             .then(response => {
//                 console.log(response)
//                 if (response.ok) {
//                     return response.json()
//                 }

//                 throw Error(response.status)
//             })
//             .then(result => {
//                 console.log(result)
//                 localStorage.setItem("accessToken", result.accessToken)
//                 this.setState({ isLogin: true })
//             })
//             .catch(error => {
//                 console.log('error', error)
//                 alert("Username, password are wrong")
//             });
//     }

//     onLogoutSuccess = () => {
//         this.setState({ isLogin: false })
//     }


//     render() {
//         return <div>

//             {this.state.isLogin ?
//                 <Profile key={this.state.isLogin} onLogoutSuccess={this.onLogoutSuccess} /> :
//                 <form>
//                     <div>
//                         <label>UserName</label>
//                         <input type="text" name="username" onChange={this.setParams} />
//                     </div>
//                     <div>
//                         <label>Password</label>
//                         <input type="password" name="password" onChange={this.setParams} />
//                     </div>
//                     <div>
//                         <button type='button' onClick={this.login}>login</button>
//                     </div>
//                 </form>
//             }
//         </div>
//     }
// };


