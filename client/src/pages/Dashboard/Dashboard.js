import React, { useEffect, useState } from 'react'
import './Dashboard.scss'

import { useLocation } from 'react-router-dom'

const Dashboard = () => {
    const location = useLocation();

    const [userinfo, setUserInfo] = useState({});

    // useEffect(() => {
    //     console.log('Data:', location.state.detail)
    //     setUserInfo(location.state.detail.data[0]);
    // }, []);

    return (
        <div>
            <div className="overview-boxes">
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Tổng Số Tài khoản</div>
                        <div className="number">68</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">Vừa Cập Nhật</span>
                        </div>
                    </div>
                    <i className="bx bx bx-user cart"></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Người Nước Ngoài</div>
                        <div className="number">150</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">Vừa Cập Nhật</span>
                        </div>
                    </div>
                    <i className="bx bx-group cart two"></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Cơ Sở Lưu Trú</div>
                        <div className="number">200</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">Vừa Cập Nhật</span>
                        </div>
                    </div>
                    <i className="bx bx-buildings cart three"></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Nhân Viên</div>
                        <div className="number">16</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">Vừa Cập Nhật</span>
                        </div>
                    </div>
                    <i className="bx bx-user-circle cart four"></i>
                </div>
            </div>

            <div className="sales-boxes">
                <div className="recent-sales box">
                    <div className="title">Thống Kê</div>
                    <div className="sales-details">
                        <ul className="details">
                            <li className="topic">Ngày</li>
                            <li><a href="#">10/06/2022</a></li>
                        </ul>
                        <ul className="details">
                            <li className="topic">Người Nước Ngoài</li>
                            <li><a href="#">90</a></li>
                        </ul>
                        <ul className="details">
                            <li className="topic">Tổng</li>
                            <li><a href="#">90</a></li>
                        </ul>
                    </div>
                    <div className="button">
                        <a href="#">Xem Tất Cả</a>
                    </div>
                </div>
                <div className="top-sales box">
                    <div className="title">Xếp Hạng Lưu Trú</div>
                    <ul className="top-sales-details">
                        <li>
                            <a href="#">
                                <img src="" alt="" />
                                <span className="product">USA</span>
                            </a>
                            <span className="price">123</span>
                        </li>
                        <li>
                            <a href="#">
                                <img src="" alt="" />
                                <span className="product">VI</span>
                            </a>
                            <span className="price">120</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard