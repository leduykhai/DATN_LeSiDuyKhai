import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../Home/Home'
import Aside from '../Aside/Aside'
import Footer from '../Footer/Footer'

import './Navbar_Client.scss'

const Navbar = (props) => {
    return (
        <div className='container-home'>
            <div className='wrapper-home'>

                <nav className='nav-home'>
                    <h2>Quản Lý Lưu Trú</h2>
                </nav>

                <header className='header-home'>
                    {/* <a href="#" className="logo"><i className="fas"></i>Logo</a> */}

                    <div className="navbar-home">
                        {/* <Link className="active a" href="#home">Trang Chủ</Link> */}
                        <Link exact to="/client_home" className="a" >Trang Chủ</Link>
                        <Link className="a" href="#about">Tin tức</Link>
                        <Link className="a" href="#menu">Lưu trú</Link>
                        <Link exact to="/client_dk" className="a">Đăng ký</Link>
                        <Link className="a" href="#order">Đăng nhập</Link>
                    </div>

                    <div className="icons">
                        <i className="fas fa-bars" id="menu-bars"></i>
                        <i className="fas fa-search" id="search-icon"></i>
                        <Link href="#" className="a fas fa-heart"></Link>
                        <Link href="#" className="a fas fa-user"></Link>
                    </div>
                </header>

                {props.children}

                <Footer />

            </div>
        </div>
    )
}

export default Navbar