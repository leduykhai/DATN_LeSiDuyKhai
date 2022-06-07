import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./ViewChuCSLT.scss"
import moment from 'moment';

const ViewChuCSLT = () => {
    const [ChuCSLT, setChuCSLT] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/chucosoluutrus/${id}`)
            .then((resp) => setChuCSLT({ ...resp.data[0] }));
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='Card'>
                <div className='Card-header'>
                    <p>Thông tin Chủ Cơ sở lưu trú</p>
                </div>
                <div className='Container'>
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Họ tên: </strong>
                    <span>{ChuCSLT.ho_ten}</span>
                    <br />
                    <br />
                    <strong>Ngày sinh: </strong>
                    <span>{moment(ChuCSLT.ngay_sinh).format('DD/MM/YYYY')}</span>
                    <br />
                    <br />
                    <strong>Giới tính: </strong>
                    <span>{ChuCSLT.gioi_tinh}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{ChuCSLT.email}</span>
                    <br />
                    <br />
                    <strong>Số điện thoại: </strong>
                    <span>{ChuCSLT.sdt}</span>
                    <br />
                    <br />
                    <strong>CCCD: </strong>
                    <span>{ChuCSLT.cccd}</span>
                    <br />
                    <br />
                    <strong>Địa chỉ: </strong>
                    <span>{ChuCSLT.dia_chi}</span>
                    <br />
                    <br />
                    <Link to="/chucslt">
                        <div className='btn'>Quay lại</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewChuCSLT