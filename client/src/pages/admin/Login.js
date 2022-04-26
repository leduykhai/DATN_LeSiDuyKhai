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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validationMsg, setValidationMsg] = useState({})
    const [message, setMessage] = useState("")

    useEffect(() => {
        const token = localStorage.getItem(APP_CONSTANTS.USER_TOKEN)
        if (token) {
            history.replace('./admin')
        }
    })

    const onChangeUsername = (event) => {
        const value = event.target.value
        setUsername(value)
    }

    const onChangePassword = (event) => {
        const value = event.target.value
        setPassword(value)
    }

    const validateAll = () => {
        const msg = {}
        if (isEmpty(username)) {
            msg.username = "Please input your Username"
        }
        // } else if (!isEmail(username)) {
        //     msg.username = "Your username is incorrect"
        // }

        if (isEmpty(password)) {
            msg.password = "Please input your Password"
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
        //         username: username,
        //         password: password
        //     }
        //     console.log(params)
        //     const res = await axios.post(ENDPOINT.LOGIN, params)
        //     console.log(res)
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

        try {
            let { data } = await login(username, password);
            console.log(data);
            if (data.status !== 'SUCCESS') {
                console.log(data.message);
            } else {
                setMessage("");
                history.push({
                    pathname: '/admin',
                    state: { admin: data }
                });
                console.log('Success!!!');
            }
        } catch (e) {
            console.log('Error in signIn: ', e.response);
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
                        <h2 class="title">Sign in</h2>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input
                                type="username"
                                name='username'
                                id='username'
                                placeholder="username"
                                autoComplete="username"
                                onChange={onChangeUsername}
                            />
                        </div>
                        <p className="social-text">{validationMsg.username}</p>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input
                                type="password"
                                name="password"
                                id='password'
                                placeholder="password"
                                autoComplete="password"
                                onChange={onChangePassword}
                            />
                        </div>
                        <p className="social-text">{validationMsg.password}</p>
                        <div className="text-center text-sm text-red-500 mt-2">{message}</div>
                        <button
                            type="button"
                            className="btn solid"
                            onClick={onSubmitLogin}
                        >
                            LOGIN
                        </button>
                        <p class="social-text">Or Sign in with social platforms</p>
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
                        <h2 class="title">Sign up</h2>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>
                        <input type="submit" class="btn" value="Sign up" />
                        <p class="social-text">Or Sign up with social platforms</p>
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
                        <h3>New here ?</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                        <button class="btn transparent" id="sign-up-btn" onClick={changeState} >
                            Sign up
                        </button>
                    </div>
                    <img src="img/log.svg" class="image" alt="" />
                </div>
                <div class="panel right-panel">
                    <div class="content">
                        <h3>One of us ?</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                            laboriosam ad deleniti.
                        </p>
                        <button class="btn transparent" id="sign-in-btn" >
                            Sign in
                        </button>
                    </div>
                    <img src="img/register.svg" class="image" alt="" />
                </div>
            </div>
        </div>
    )
}
export default Login;

