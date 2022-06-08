import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./ViewTT.scss"
import moment from 'moment';

const ViewTT = () => {
    const [TT, setTt] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/tintucs/${id}`)
            .then((resp) => setTt({ ...resp.data[0] }));
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='Card'>
                <div className='Card-header'>
                    <p>Tin Tức</p>
                </div>
                <div className='Container'>
                    <strong>ID: </strong>
                    <span>N{id}</span>
                    <br />
                    <br />
                    <strong>Tiêu Đề: </strong>
                    <span>{TT.tieu_de}</span>
                    <br />
                    <br />
                    <strong>Ngày Tạo: </strong>
                    <span>{moment(TT.ngay_tao).format('DD/MM/YYYY hh:ss:mm')}</span>
                    <br />
                    <br />
                    <Link to="/tintuc">
                        <div className='btn'>Quay Lại</div>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default ViewTT