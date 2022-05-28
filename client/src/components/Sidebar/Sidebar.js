import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Navbar/Navbar'

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
                            <i class="bx bx-box"></i>
                            <span class="links_name">Account User</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/Chu_CSLT">
                            <i class="bx bx-list-ul"></i>
                            <span class="links_name">Owner of <br /> accommodation</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/nguoinuocngoais">
                            <i class="bx bx-pie-chart-alt-2"></i>
                            <span class="links_name">Analytics</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/dashboard">
                            <i class="bx bx-coin-stack"></i>
                            <span class="links_name">Stock</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/dashboard">
                            <i class="bx bx-book-alt"></i>
                            <span class="links_name">Total order</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/dashboard">
                            <i class="bx bx-user"></i>
                            <span class="links_name">Team</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/dashboard">
                            <i class="bx bx-message"></i>
                            <span class="links_name">Messages</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/dashboard">
                            <i class="bx bx-heart"></i>
                            <span class="links_name">Favrorites</span>
                        </Link>
                    </li>
                    <li>
                        <Link exact to="/dashboard">
                            <i class="bx bx-cog"></i>
                            <span class="links_name">Setting</span>
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