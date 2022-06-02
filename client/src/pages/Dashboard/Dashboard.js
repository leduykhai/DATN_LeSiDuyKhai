import React from 'react'
import './Dashboard.scss'

const Dashboard = () => {
    return (
        <div>
            <div className="overview-boxes">
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Total User</div>
                        <div className="number">40,876</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">Up from yesterday</span>
                        </div>
                    </div>
                    <i className="bx bx bx-user cart"></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Total Foreigner</div>
                        <div className="number">38,876</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">Up from yesterday</span>
                        </div>
                    </div>
                    <i className="bx bx-group cart two"></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Total CSLT</div>
                        <div className="number">12,876</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">Up from yesterday</span>
                        </div>
                    </div>
                    <i className="bx bx-buildings cart three"></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Total Employee</div>
                        <div className="number">11,086</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">Up from yesterday</span>
                        </div>
                    </div>
                    <i className="bx bx-user-circle cart four"></i>
                </div>
            </div>

            <div className="sales-boxes">
                <div className="recent-sales box">
                    <div className="title">Statistical</div>
                    <div className="sales-details">
                        <ul className="details">
                            <li className="topic">Date</li>
                            <li><a href="#">02 Jan 2021</a></li>
                        </ul>
                        <ul className="details">
                            <li className="topic">Foreigner</li>
                            <li><a href="#">ABC</a></li>
                        </ul>
                        <ul className="details">
                            <li className="topic">Total</li>
                            <li><a href="#">1500</a></li>
                        </ul>
                    </div>
                    <div className="button">
                        <a href="#">See All</a>
                    </div>
                </div>
                <div className="top-sales box">
                    <div className="title">Country of Residence Rating</div>
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