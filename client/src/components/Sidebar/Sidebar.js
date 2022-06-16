import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

import './Sidebar.scss'

const Sidebar = (props) => {

    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("nhanvien")
    }

    const role = () => {
        const response = JSON.parse(localStorage.getItem('user'));
        if (response[0].id != 1) {
            window.alert("Tài Khoản Của Bạn không Có quyền truy cập")
            setTimeout(() => history.goBack(), 100);
        }
    };

    return (
        <body>
            <div class="sidebar">
                <div class="logo-details">
                    <i class="bx"></i>
                    <span class="logo_name">DUY KHAI</span>
                </div>
                <ul class="nav-links">
                    <li onClick={role}>
                        <Link exact to="/dashboard" class="active">
                            <i class="bx bx-grid-alt"></i>
                            <span class="links_name">Tổng Quan</span>
                        </Link>
                    </li>
                    <li onClick={role}>
                        <Link exact to="/users">
                            <i class="bx bx-user"></i>
                            <span class="links_name">Tài Khoản</span>
                        </Link>
                    </li>

                    <span class="nav-part">Nhân Viên</span>

                    <li onClick={role}>
                        <Link exact to="/nhanvien">
                            <i class=" bx bx-user-circle"></i>
                            <span class="links_name">Nhân Viên</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/tintuc">
                            <i class="bx bx-news"></i>
                            <span class="links_name">Tin Tức</span>
                        </Link>
                    </li>
                    <span class="nav-part">Cơ Sở Lưu Trú</span>
                    <li>
                        <Link exact to="/tk_cslt">
                            <i class="bx bx-user-circle"></i>
                            <span class="links_name">TK Cơ Sở Lưu Trú</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/chucslt">
                            <i class="bx bx-buildings"></i>
                            <span class="links_name">Chủ Cơ Sở Lưu Trú</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/cslt">
                            <i class=" bx bx-home-circle"></i>
                            <span class="links_name">Cơ Sở Lưu Trú</span>
                        </Link>
                    </li>

                    <li>
                        <Link exact to="/lt">
                            <i class=" bx bx-map"></i>
                            <span class="links_name">Lưu Trú</span>
                        </Link>
                    </li>

                    <li>
                        <Link exact to="/dg">
                            <i class="bx bx-message"></i>
                            <span class="links_name">Đánh Giá</span>
                        </Link>
                    </li>

                    <span class="nav-part">Người Nước ngoài</span>

                    <li>
                        <Link exact to="/tk_nnn">
                            <i class="bx bx-group"></i>
                            <span class="links_name">TK Người Nước Ngoài</span>
                        </Link>
                    </li>

                    <li>
                        <Link exact to="/nnn">
                            <i class="bx bx-group"></i>
                            <span class="links_name">Người Nước Ngoài</span>
                        </Link>
                    </li>

                    <li>
                        <Link exact to="/nklt">
                            <i class=" bx bx-book-content"></i>
                            <span class="links_name">Nhật Ký Lưu Trú</span>
                        </Link>
                    </li>

                    <li>
                        <Link exact to="/kbt">
                            <i class="bx bx-book-alt"></i>
                            <span class="links_name">Khai Báo Trước</span>
                        </Link>
                    </li>

                    {/* <li class="log_out"> */}
                    <li class="links_name">
                        <Link exact to="/" onClick={logout}>
                            <i class="bx bx-log-out"></i>
                            <span class="links_name">Đăng Xuất</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <section class="home-section">
                <Navbar />
                <div class="home-content">
                    {props.children}
                </div>
            </section>
        </body>
    )
}

export default Sidebar