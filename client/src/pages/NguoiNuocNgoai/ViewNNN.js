import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./ViewNNN.scss"
import moment from 'moment';

const ViewNNN = () => {
    const [NNN, setNnn] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/nguoinuocngoais/${id}`)
            .then((resp) => setNnn({ ...resp.data[0] }));
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='Card'>
                <div className='Card-header'>
                    <p>Thông tin người nước ngoài</p>
                </div>
                <div className='Container'>
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Họ Tên: </strong>
                    <span>{NNN.ho_ten}</span>
                    <br />
                    <br />
                    <strong>Ngày Sinh: </strong>
                    <span>{moment(NNN.ngay_sinh).format('DD/MM/YYYY')}</span>
                    <br />
                    <br />
                    <strong>Giới Tính: </strong>
                    <span>{NNN.gioi_tinh}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{NNN.email}</span>
                    <br />
                    <br />
                    <strong>Số Điện Thoại: </strong>
                    <span>{NNN.sdt}</span>
                    <br />
                    <br />
                    <strong>Số Hộ Chiếu: </strong>
                    <span>{NNN.so_ho_chieu}</span>
                    <br />
                    <br />
                    <strong>Địa Chỉ: </strong>
                    <span>{NNN.dia_chi}</span>
                    <br />
                    <br />
                    <Link to="/nnn">
                        <div className='btn'>Quay Lại</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewNNN