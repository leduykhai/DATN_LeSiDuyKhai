import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

import './Sidebar.scss'

const Sidebar = (props) => {
    return (
        <body>
            <div class="sidebar">
                <div class="logo-details">
                    <i class="bx"></i>
                    <span class="logo_name">DUY KHAI</span>
                </div>
                <ul class="nav-links">
                    <li>
                        <Link exact to="/dashboard" class="active">
                            <i class="bx bx-grid-alt"></i>
                            <span class="links_name">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/users">
                            <i class="bx bx-user"></i>
                            <span class="links_name">Account User</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/nhanvien">
                            <i class=" bx bx-user-circle"></i>
                            <span class="links_name">Nhân Viên</span>
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
                        <Link exact to="/dashboard">
                            <i class="bx bx-book-alt"></i>
                            <span class="links_name">Khai Báo Trước</span>
                        </Link>
                    </li>

                    <li>
                        <Link exact to="/nnn">
                            <i class="bx bx-group"></i>
                            <span class="links_name">Người Nước Ngoài</span>
                        </Link>
                    </li>

                    <li>
                        <Link exact to="/dashboard">
                            <i class=" bx bx-home-alt"></i>
                            <span class="links_name">Lưu Trú</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/dashboard">
                            <i class=" bx bx-book-content"></i>
                            <span class="links_name">Nhật Ký Lưu Trú</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/dashboard">
                            <i class="bx bx-news"></i>
                            <span class="links_name">Tin Tức</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/dashboard">
                            <i class="bx bx-message"></i>
                            <span class="links_name">Đánh Giá</span>
                        </Link>
                    </li>
                    <li class="log_out">
                        <Link exact to="/">
                            <i class="bx bx-log-out"></i>
                            <span class="links_name">Log out</span>
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