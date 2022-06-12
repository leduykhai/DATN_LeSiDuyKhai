import React from 'react'
import { Link } from 'react-router-dom'

import Footer from '../Footer/Footer'

import './Navbar_Client.scss'

const Navbar = (props) => {
    return (
        <div className='container-home'>
            <div className='wrapper-home'>

                <nav className='nav-home'>
                    <div>
                        <div className="img-nav">
                            <img src='' alt='' />
                            <div className='title-nav'>
                                <h3>Công An Thành Phố Đà Nẵng</h3>
                                <h3>Hệ Thống Quản Lý Thông Tin Lưu Trú</h3>
                            </div>
                        </div>
                    </div>
                </nav>

                <header className='header-home'>
                    {/* <a href="#" className="logo"><i className="fas"></i>Logo</a> */}

                    <div className="navbar-home">
                        {/* <Link className="active a" href="#home">Trang Chủ</Link> */}
                        <Link exact to="/client" className="a" >Trang Chủ</Link>
                        <Link className="a" href="#about">Tin tức</Link>
                        <Link className="a" href="#menu">Lưu trú</Link>
                        <Link exact to="/client_dk_b1" className="a">Đăng ký</Link>
                        <Link exact to="/login" className="a">Đăng nhập</Link>
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