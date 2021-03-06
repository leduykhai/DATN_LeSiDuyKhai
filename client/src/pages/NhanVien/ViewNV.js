import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./ViewNV.scss"
import moment from 'moment';

const ViewNV = () => {
    const [NhanVien, setChuCSLT] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/nhanviens/${id}`)
            .then((resp) => setChuCSLT({ ...resp.data[0] }));
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='Card'>
                <div className='Card-header'>
                    <p>Thông tin nhân viên</p>
                </div>
                <div className='Container'>
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Họ tên: </strong>
                    <span>{NhanVien.ho_ten}</span>
                    <br />
                    <br />
                    <strong>Ngày sinh: </strong>
                    <span>{moment(NhanVien.ngay_sinh).format('DD/MM/YYYY')}</span>
                    <br />
                    <br />
                    <strong>Giới tính: </strong>
                    <span>{NhanVien.gioi_tinh}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{NhanVien.email}</span>
                    <br />
                    <br />
                    <strong>Số điện thoại: </strong>
                    <span>{NhanVien.sdt}</span>
                    <br />
                    <br />
                    <strong>Căn Cước Công Dân: </strong>
                    <span>{NhanVien.cccd}</span>
                    <br />
                    <br />
                    <strong>Địa Chỉ: </strong>
                    <span>{NhanVien.dia_chi}</span>
                    <br />
                    <br />
                    <Link to="/NhanVien">
                        <div className='btn'>Quay lại</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewNV