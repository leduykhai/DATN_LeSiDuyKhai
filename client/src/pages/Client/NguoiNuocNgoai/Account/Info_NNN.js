import * as React from 'react';
import axios from 'axios';
import moment from 'moment';

import './Info_NNN.scss'
import { Link } from 'react-router-dom';

export default function Chu_CSLT() {

    const response = JSON.parse(localStorage.getItem('user'));

    const id = response[0].id

    const [data, setData] = React.useState([]);

    const loadData = async () => {
        const response = await axios.get(`http://localhost:3000/nguoinuocngoaisuserone/${id}`);
        localStorage.setItem("chucslt", JSON.stringify(response.data))
        setData(response.data);
    };

    React.useEffect(() => {
        loadData();
    }, []);

    const Dropdown = (e) => {
        let click = document.querySelector('.click-dd');
        let list = document.querySelector('.list-dd');
        click.addEventListener("click", () => {
            list.classList.toggle('newlist-dd');
        });
    }

    return (
        <div>
            {data.map((item, index) => {
                return (
                    <body className='body'>
                        <div className="container-chucslt">
                            <header className='header'>Quản Lý Lưu Trú</header>
                            <div className='body-dd' onClick={Dropdown}>
                                <div class="container-dd">
                                    <button class="click-dd">-- Chọn Danh Mục --</button>
                                    <div class="list-dd newlist-dd">
                                        <Link to={`/editinfo_nnn/${item.id}`}>
                                            <button class="links-dd">Cập Nhật Thông Tin</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <form className='form-all'>
                                <div className="form-chucslt first-chucslt">
                                    <div className="details personal">
                                        <span className="title-chucslt">Thông tin cá nhân</span>

                                        <div className="fields-chucslt">
                                            <div className="input-field-chucslt">
                                                <label className='label'>Họ tên</label>
                                                <input
                                                    type="text"
                                                    value={item.ho_ten}
                                                />
                                            </div>

                                            <div className="input-field-chucslt">
                                                <label className='label'>Ngày sinh</label>
                                                <input
                                                    type="text"
                                                    value={moment(item.ngay_sinh).format('YYYY-MM-DD') || ""}
                                                />
                                            </div>

                                            <div className="input-field-chucslt">
                                                <label className='label'>Giới tính</label>
                                                <input
                                                    type="text"
                                                    value={item.gioi_tinh}
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
                                                <label className='label'>Số Hộ Chiếu</label>
                                                <input
                                                    type="text"
                                                    value={item.so_ho_chieu}
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
                                            <div className="input-field-chucslt">
                                                <label className='label'>Ngày Đăng Ký</label>
                                                <input
                                                    type="text"
                                                    value={moment(item.ngay_dang_ky).format("DD/MM/YYYY")}
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
