import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./ViewNNN.scss"
import moment from 'moment';

const ViewNNN = () => {
    const [NhanVien, setChuCSLT] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/nguoinuocngoais/${id}`)
            .then((resp) => setChuCSLT({ ...resp.data[0] }));
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='Card'>
                <div className='Card-header'>
                    <p>NhanVien Detail</p>
                </div>
                <div className='Container'>
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>FullName: </strong>
                    <span>{NhanVien.ho_ten}</span>
                    <br />
                    <br />
                    <strong>Date of birth: </strong>
                    <span>{moment(NhanVien.ngay_sinh).format('DD/MM/YYYY')}</span>
                    <br />
                    <br />
                    <strong>Gender: </strong>
                    <span>{NhanVien.gioi_tinh}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{NhanVien.email}</span>
                    <br />
                    <br />
                    <strong>Phone Number: </strong>
                    <span>{NhanVien.sdt}</span>
                    <br />
                    <br />
                    <strong>Citizen ID: </strong>
                    <span>{NhanVien.cccd}</span>
                    <br />
                    <br />
                    <strong>Address: </strong>
                    <span>{NhanVien.dia_chi}</span>
                    <br />
                    <br />
                    <Link to="/NhanVien">
                        <div className='btn'>Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewNNN