import * as React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


import './ListCSLT.scss'
import moment from 'moment';

export default function ListCSLT() {

    const [data, setData] = React.useState([]);

    const history = useHistory();

    const { id } = useParams();

    const [cslt, setCslt] = React.useState([]);

    const loadData = async () => {
        const response = await axios.get(`http://localhost:3000/ccslts/${id}`);
        localStorage.setItem("cslt", JSON.stringify(response.data))
        setData(response.data);
    };

    React.useEffect(() => {
        loadData();
    }, []);

    // //CSLT
    // React.useEffect(() => {
    //     const getCslt = async () => {
    //         const rescslt = await fetch(`http://localhost:3000/cslts/${id}`);
    //         const resc = await rescslt.json();
    //         localStorage.setItem("cslt", JSON.stringify(resc))
    //         setCslt(await resc);
    //     }
    //     getCslt();
    // }, []);

    const Dropdown = (e) => {
        let click = document.querySelector('.click-list-cslt');
        let list = document.querySelector('.list-list-cslt');
        click.addEventListener("click", () => {
            list.classList.toggle('newlist-list-cslt');
        });
    }

    const handleBack = (e) => {
        setTimeout(() => history.goBack(), 100);
    }

    return (
        <div>
            {data.map((item, index) => {
                return (
                    <body className='body'>
                        <div className="container-chucslt">
                            <header className='header'>Quản Lý Cơ Sở Lưu Trú</header>
                            <div className='body-list-cslt' onClick={Dropdown}>
                                <div class="container-list-cslt">
                                    <ArrowCircleLeftIcon className='add-icon' sx={{ fontSize: 50 }} onClick={handleBack} />
                                    <button class="click-list-cslt">-- Chọn Danh Mục --</button>
                                    <div class="list-list-cslt newlist-list-cslt">
                                        <Link to={`/editcslt/${item.id}`}>
                                            <button class="links-list-cslt">Cập Nhật Thông Tin</button>
                                        </Link>
                                        <Link to={`/addaccount`}>
                                            <button class="links-list-cslt">Thêm Tài Khoản Người Nước Ngoài</button>
                                        </Link>
                                        <Link to={`/ds_kbt/${item.id}`}>
                                            <button class="links-list-cslt">Danh Sách Khai Báo Lưu Trú</button>
                                        </Link>
                                        {/* <Link to={`/add_nnn/${item.id}`}>
                                            <button class="links-list-cslt">Thêm Thông Tin Người Nước Ngoài</button>
                                        </Link> */}
                                        <Link to={`/client_nnn/${item.id}`}>
                                            <button class="links-list-cslt">Quản Lý Người Nước Ngoài</button>
                                        </Link>
                                        <Link to={`/edit_gt/${item.id}`}>
                                            <button class="links-list-cslt">Giới thiệu</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <form className='form-all'>
                                <div className="form-chucslt first-chucslt">
                                    <div className="details personal">
                                        <span className="title-chucslt">Thông tin cơ sở lưu trú</span>

                                        <div className="fields-chucslt">
                                            <div className="input-field-chucslt">
                                                <label className='label'>Tên Cơ Sở Lưu trú</label>
                                                <input
                                                    type="text"
                                                    value={item.ten_cslt}
                                                />
                                            </div>

                                            <div className="input-field-chucslt">
                                                <label className='label'>Loại Cơ Sở Lưu Trú</label>
                                                <input
                                                    type="text"
                                                    value={item.loai_cslt}
                                                />
                                            </div>

                                            <div className="input-field-chucslt">
                                                <label className='label'>Người Đại Diện</label>
                                                <input
                                                    type="text"
                                                    value={item.nguoi_dai_dien}
                                                />
                                            </div>

                                            <div className="input-field-chucslt">
                                                <label className='label'>Email</label>
                                                <input
                                                    type="email"
                                                    value={item.email}
                                                />
                                            </div>

                                            <div className="input-field-chucslt">
                                                <label className='label'>Địa Chỉ</label>
                                                <input
                                                    type="text"
                                                    value={item.dia_chi}
                                                />
                                            </div>

                                            <div className="input-field-chucslt">
                                                <label className='label'>Số Điện Thoại</label>
                                                <input
                                                    type="text"
                                                    value={item.sdt}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </body>
                );
            })}
        </div>
    );
}
