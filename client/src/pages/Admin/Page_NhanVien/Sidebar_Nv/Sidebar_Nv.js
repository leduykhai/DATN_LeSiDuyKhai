import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../../../components/Navbar/Navbar'

// import './Sidebar.scss'

const Sidebar = (data) => {

    const logout = () => {
        localStorage.removeItem("user")
    }

    return (
        <body>
            <div class="sidebar">
                <div class="logo-details">
                    <i class="bx"></i>
                    <span class="logo_name">NHAN VIEN</span>
                </div>
                <ul class="nav-links">

                    <li>
                        <Link exact to="">
                            <i class=" bx bx-user-circle"></i>
                            <span class="links_name">Thông Tin Cá Nhân</span>
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
                    {data.children}
                </div>
            </section>
        </body>
    )
}

export default Sidebar