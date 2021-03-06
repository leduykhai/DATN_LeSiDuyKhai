import React, { useEffect, useState } from 'react'
import './Dashboard.scss'

import { useHistory, useLocation } from 'react-router-dom'
import moment from 'moment';

const Dashboard = () => {
    const location = useLocation();

    const history = useHistory()


    const [userinfo, setUserInfo] = useState([]);

    // const loadData = async () => {
    //     const response = JSON.parse(localStorage.getItem('user'));
    //     setUserInfo(response);
    // };

    // useEffect(() => {
    //     loadData();
    // }, []);


    // useEffect(() => {
    //     console.log('Data:', location.state.detail)
    //     setUserInfo(location.state.detail.data[0]);
    // }, []);




    // useEffect(() => {
    //     const token = localStorage.getItem('user')
    //     if (!token) {
    //         history.replace('/login') //./user
    //     }
    // })

    // const response = JSON.parse(localStorage.getItem('user'));

    // console.log(response)



    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const resuser = await fetch("http://localhost:3000/users");
            const resu = await resuser.json();
            setUser(await resu);
        }
        getUser();
    }, []);

    const [nnn, setNnn] = useState([]);

    //nguoi nuoc ngoai
    useEffect(() => {
        const getNNN = async () => {
            const resnnn = await fetch("http://localhost:3000/nguoinuocngoais");
            const resn = await resnnn.json();
            setNnn(await resn);
        }
        getNNN();
    }, []);

    const [cslt, setCslt] = useState([]);

    //CSLT
    useEffect(() => {
        const getCslt = async () => {
            const rescslt = await fetch("http://localhost:3000/cslts");
            const resc = await rescslt.json();
            setCslt(await resc);
        }
        getCslt();
    }, []);

    const [nhanvien, setNhanvien] = useState([]);

    //nhan vien
    useEffect(() => {
        const getNV = async () => {
            const resnhanvien = await fetch("http://localhost:3000/nhanviens");
            const resnv = await resnhanvien.json();
            setNhanvien(await resnv);
        }
        getNV();
    }, []);

    const date = moment(Date()).format("DD/MM/YYYY");


    return (
        <div>
            <div className="overview-boxes">
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">T??i kho???n</div>
                        <div className="number">{user.length}</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">V???a C???p Nh???t</span>
                        </div>
                    </div>
                    <i className="bx bx bx-user cart"></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Ng?????i N?????c Ngo??i</div>
                        <div className="number">{nnn.length}</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">V???a C???p Nh???t</span>
                        </div>
                    </div>
                    <i className="bx bx-group cart two"></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">C?? S??? L??u Tr??</div>
                        <div className="number">{cslt.length}</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">V???a C???p Nh???t</span>
                        </div>
                    </div>
                    <i className="bx bx-buildings cart three"></i>
                </div>
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Nh??n Vi??n</div>
                        <div className="number">{nhanvien.length}</div>
                        <div className="indicator">
                            <i className="bx bx-up-arrow-alt"></i>
                            <span className="text">V???a C???p Nh???t</span>
                        </div>
                    </div>
                    <i className="bx bx-user-circle cart four"></i>
                </div>
            </div>

            <div className="sales-boxes">
                <div className="recent-sales box">
                    <div className="title">Th???ng K??</div>
                    <div className="sales-details">
                        <ul className="details">
                            <li className="topic">Ng??y</li>
                            <li><a href="#">{date}</a></li>
                        </ul>
                        <ul className="details">
                            <li className="topic">Ng?????i N?????c Ngo??i</li>
                            <li><a href="#">{nnn.length}</a></li>
                        </ul>
                        <ul className="details">
                            <li className="topic">T???ng</li>
                            <li><a href="#">{nnn.length}</a></li>
                        </ul>
                    </div>
                    <div className="button">
                        <a href="#">Xem T???t C???</a>
                    </div>
                </div>
                <div className="top-sales box">
                    <div className="title">X???p H???ng L??u Tr??</div>
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