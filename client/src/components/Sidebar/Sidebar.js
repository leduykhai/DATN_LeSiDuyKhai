import React from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../Navbar/Navbar'

import './Sidebar.scss'

const Sidebar = (props) => {
    return (
        // <div className='wrapper'>
        //     <header className='header'>
        //         <h1>HỆ THÔNG QUẢN LÝ LƯU TRÚ</h1>
        //     </header>
        //     <aside className='aside aside1'>
        //         <h1>Quản lý nhân viên</h1>
        //         <h1>Quản lý người nước ngoài</h1>
        //         <h1>Quản lý lưu trú</h1>
        //     </aside>
        //     <article className='main'>
        //         {props.children}
        //     </article>
        //     <aside className='aside aside2'>
        //         side 2
        //     </aside>
        //     <footer className='footer'>footer</footer>
        // </div>
        <div className='body'>
            <div className="sidebar">
                <Link className="active" exact to="/dashboard">Dashboard</Link>
                <Link className='item' exact to="/users">Account User</Link>
                <Link className='item' exact to="/Chu_CSLT">Owner of accommodation</Link>
                <Link className='item' exact to="/nguoinuocngoais">Foreigner</Link>
            </div>
            {/* <Topbar /> */}
            <div className="content">

                {props.children}
            </div>
        </div>
    )
}

export default Sidebar