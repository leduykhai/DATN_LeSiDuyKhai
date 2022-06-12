import React from 'react'
import './Footer.scss'

const Footer = () => {
    return (
        <footer className='footer-home'>
            <div className='footer-content'>
                <h3>Lê Sĩ Duy Khải</h3>
                <p>
                    Hệ Thống Quản Lý Lưu Trú Người Nước Ngoài Tại Thành Phố Đà Nẵng
                </p>
                <ul className='socials'>
                    <li><a href='#'><i className='fa fa-facebook'></i></a></li>
                    <li><a href='#'><i className='fa fa-google-plus'></i></a></li>
                    <li><a href='#'><i className='fa fa-twitter'></i></a></li>
                    <li><a href='#'><i className=''></i>Liên Hệ: 0354487232</a></li>
                </ul>
            </div>
            <div className='footer-bottom'>
                <p>Đồ Án Tốt Nghiệp &copy; 2022 Sinh viên thực hiện: <span>Lê Sĩ Duy Khải</span></p>
            </div>
        </footer>
    )
}

export default Footer