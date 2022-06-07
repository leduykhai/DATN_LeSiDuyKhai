import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./ViewCSLT.scss"

const ViewCSLT = () => {
    const [CSLT, setCSLT] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/cslts/${id}`)
            .then((resp) => setCSLT({ ...resp.data[0] }));
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='Card'>
                <div className='Card-header'>
                    <p>Thông tin cơ sở lưu trú</p>
                </div>
                <div className='Container'>
                    <strong>ID: </strong>
                    <span>CSLT{id}</span>
                    <br />
                    <br />
                    <strong>Tên CSLT: </strong>
                    <span>{CSLT.ten_cslt}</span>
                    <br />
                    <br />
                    <strong>Loại CSLT: </strong>
                    <span>{CSLT.loai_cslt}</span>
                    <br />
                    <br />
                    <strong>Người Đại Diện: </strong>
                    <span>{CSLT.nguoi_dai_dien}</span>
                    <br />
                    <br />
                    <strong>Email CSLT: </strong>
                    <span>{CSLT.email}</span>
                    <br />
                    <br />
                    <strong>Số Điện Thoại: </strong>
                    <span>{CSLT.sdt}</span>
                    <br />
                    <br />
                    <strong>Địa Chỉ: </strong>
                    <span>{CSLT.dia_chi}</span>
                    <br />
                    <br />
                    <Link to="/cslt">
                        <div className='btn'>Quay Lại</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewCSLT