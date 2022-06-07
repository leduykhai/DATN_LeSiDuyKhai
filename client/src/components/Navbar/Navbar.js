import React from 'react'

import './Navbar.scss'

const Navbar = (props) => {
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
                    <input type="text" placeholder="Tìm Kiếm..." />
                    <i class="bx bx-search"></i>
                </div>
                <div class="profile-details">
                    <img src="" alt="" />
                    <span class="admin_name">Quản Trị Viên</span>
                    <i class="bx bx-chevron-down"></i>
                </div>
            </nav>
            {/* <div class="home-content">
                {props.children}
            </div> */}
            {/* </section> */}
        </div>
    )
}

export default Navbar