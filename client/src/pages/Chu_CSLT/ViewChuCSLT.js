import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./ViewChuCSLT.scss"
import moment from 'moment';

const View = () => {
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
                    <p>ChuCSLT Detail</p>
                </div>
                <div className='Container'>
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>FullName: </strong>
                    <span>{ChuCSLT.ho_ten}</span>
                    <br />
                    <br />
                    <strong>Date of birth: </strong>
                    <span>{moment(ChuCSLT.ngay_sinh).format('DD/MM/YYYY')}</span>
                    <br />
                    <br />
                    <strong>Gender: </strong>
                    <span>{ChuCSLT.gioi_tinh}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{ChuCSLT.email}</span>
                    <br />
                    <br />
                    <strong>Phone Number: </strong>
                    <span>{ChuCSLT.sdt}</span>
                    <br />
                    <br />
                    <strong>Citizen ID: </strong>
                    <span>{ChuCSLT.cccd}</span>
                    <br />
                    <br />
                    <strong>Address: </strong>
                    <span>{ChuCSLT.dia_chi}</span>
                    <br />
                    <br />
                    <Link to="/ChuCSLT">
                        <div className='btn'>Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View