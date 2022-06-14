import * as React from 'react';
import axios from 'axios';
import moment from 'moment';

import './NNN.scss'
import { Link } from 'react-router-dom';

export default function NNN() {

    const response = JSON.parse(localStorage.getItem('user'));

    const id = response[0].id

    const [data, setData] = React.useState([]);

    const loadData = async () => {
        const response = await axios.get(`http://localhost:3000/nguoinuocngoaisuser/${id}`);
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
                        <div className="container-nnn-cl">
                            <header className='header'>Thông tin tài khoản</header>
                            <div className='body-dd' onClick={Dropdown}>
                                <div class="container-dd">
                                    <button class="click-dd">-- Chọn Danh Mục --</button>
                                    <div class="list-dd newlist-dd">
                                        <Link to={`/edit_nnn/${item.id}`}>
                                            <button class="links-dd">Cập Nhật Thông Tin</button>
                                        </Link>
                                        <Link to={`/lslt_nnn/${item.id}`}>
                                            <button class="links-dd">Quản Lý Lịch sử lưu trú</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <form className='form-all'>
                                <div className="form-nnn-cl first-nnn-cl">
                                    <div className="details personal">
                                        <span className="title-nnn-cl">Thông tin cá nhân</span>

                                        <div className="fields-nnn-cl">
                                            <div className="input-field-nnn-cl">
                                                <label className='label'>Họ tên</label>
                                                <input
                                                    type="text"
                                                    value={item.ho_ten}
                                                />
                                            </div>

                                            <div className="input-field-nnn-cl">
                                                <label className='label'>Ngày sinh</label>
                                                <input
                                                    type="text"
                                                    value={moment(item.ngay_sinh).format('YYYY-MM-DD') || ""}
                                                />
                                            </div>

                                            <div className="input-field-nnn-cl">
                                                <label className='label'>Giới tính</label>
                                                <input
                                                    type="text"
                                                    value={item.gioi_tinh}
                                                />
                                            </div>

                                            <div className="input-field-nnn-cl">
                                                <label className='label'>Email</label>
                                                <input
                                                    type="email"
                                                    value={item.email}
                                                />
                                            </div>

                                            <div className="input-field-nnn-cl">
                                                <label className='label'>Số Hộ Chiếu</label>
                                                <input
                                                    type="text"
                                                    value={item.so_ho_chieu}
                                                />
                                            </div>

                                            <div className="input-field-nnn-cl">
                                                <label className='label'>Địa Chỉ</label>
                                                <input
                                                    type="text"
                                                    value={item.dia_chi}
                                                />
                                            </div>

                                            <div className="input-field-nnn-cl">
                                                <label className='label'>Số Điện Thoại</label>
                                                <input
                                                    type="text"
                                                    value={item.sdt}
                                                />
                                            </div>
                                            <div className="input-field-nnn-cl">
                                                <label className='label'>Ngày Đăng Ký</label>
                                                <input
                                                    type="text"
                                                    value={moment(item.ngay_dang_ky).format('YYYY-MM-DD hh:mm:ss')}
                                                />
                                            </div>
                                            <div className="input-field-nnn-cl">

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
