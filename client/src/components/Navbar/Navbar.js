import React from 'react'
import { Link } from 'react-router-dom';

import './Navbar.scss'

const Navbar = (props) => {

    const response = JSON.parse(localStorage.getItem('user'));


    // let sidebar = document.querySelector(".sidebar");
    // let sidebarBtn = document.querySelector(".sidebarBtn");
    // sidebarBtn.onclick = function () {
    //     sidebar.classList.toggle("active");
    //     if (sidebar.classList.contains("active")) {
    //         sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    //     } else
    //         sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    // }

    const changeState = () => {
        const sidebar = document.querySelector(".sidebar");
        const sidebarBtn = document.querySelector(".sidebarBtn");

        sidebar.classList.toggle("active");
        if (sidebar.classList.contains("active")) {
            sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else
            sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }

    return (
        <div >
            {/* <section class="home-section"> */}
            <nav>
                <div class="sidebar-button">
                    <i class="bx bx-menu sidebarBtn" onClick={changeState}></i>
                    <span class="dashboard">Quản Lý Lưu Trú</span>
                </div>
                <div class="search-box">
                    {/* <input type="text" placeholder="Tìm Kiếm..." /> */}
                    {/* <i class="bx bx-search"></i> */}
                </div>
                <Link to='/userinfo'>
                    <div class="profile-details">
                        <div className="avatar">
                            <img src='' alt='' />
                        </div>
                        <span class="admin_name">{response[0].ho_ten}</span>
                        <i class="bx bx-chevron-down"></i>
                    </div>
                </Link>
            </nav>
            {/* <div class="home-content">
                {props.children}
            </div> */}
            {/* </section> */}
        </div>
    )
}

export default Navbar