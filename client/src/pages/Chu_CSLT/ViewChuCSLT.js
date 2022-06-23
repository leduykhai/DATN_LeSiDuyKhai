import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./ViewChuCSLT.scss"
import moment from 'moment';

const ViewChuCSLT = () => {
    const [ChuCSLT, setChuCSLT] = useState({});

    const { id } = useParams();

    const history = useHistory();

    const [nhanvien, setNhanvien] = useState([]);

    useEffect(() => {
        const getNV = async () => {
            const resnhanvien = await fetch(`http://localhost:3000/nhanviens`);
            const resnv = await resnhanvien.json();
            setNhanvien(await resnv);
        }
        getNV();
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/chucosoluutrus/${id}`)
            .then((resp) => setChuCSLT({ ...resp.data[0] }));
    }, [id]);

    const handleBack = (e) => {
        setTimeout(() => history.goBack(), 100);
    }

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
                    <strong>Nhân Viên Duyệt: </strong>
                    <span>
                        <select
                            className="form-select"
                            type="select"
                            name="nhanvien_id"
                            id='nhanvien_id'
                            value={ChuCSLT.nhanvien_id || ""}
                            disabled
                        >
                            <option disabled selected value="">--Tên Nhân Viên--</option>
                            {
                                nhanvien.map((getnv, index) => (
                                    <option key={index} value={getnv.id}> {getnv.ho_ten} </option>
                                ))
                            }
                        </select>
                    </span>
                    <br />
                    <br />
                    {/* <Link to="/chucslt"> */}
                    <div className='btn' onClick={handleBack}>Quay lại</div>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    )
}

export default ViewChuCSLT