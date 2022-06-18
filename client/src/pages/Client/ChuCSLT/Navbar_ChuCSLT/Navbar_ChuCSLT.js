import React from 'react'
import { Link } from 'react-router-dom'

import Footer from '../../../Client/Components/Footer/Footer'

import './Navbar_ChuCSLT.scss'

const Navbar_ChuCSLT = (props) => {
    const response = JSON.parse(localStorage.getItem('user'));

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("nhanvien")
        localStorage.removeItem("chucslt")
        localStorage.removeItem("cslt")
        localStorage.removeItem("kbt")
        localStorage.removeItem("adduser")
    }

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
                        <Link exact to="" className="a" ></Link>
                        <Link exact to="" className="a" ></Link>
                        {/* <Link exact to="/ds_kbt" className="a" href="#about">Danh Sách Khai Báo</Link> */}
                        <Link exact to="/account_ccslt" className="a" >Xin Chào {response[0].ho_ten}</Link>
                        <Link exact to="/login" className="a" href="#about" onClick={logout} >Đăng Xuất</Link>
                    </div>

                    <div className="icons">
                        <i className="fas fa-bars" id="menu-bars"></i>
                        <i className="fas fa-search" id="search-icon"></i>
                        <Link href="#" className="a fas fa-heart"></Link>
                        <Link exact to="/login" className="a fas fa-user"></Link>
                    </div>
                </header>

                {props.children}

                <Footer />

            </div>
        </div>
    )
}

export default Navbar_ChuCSLT