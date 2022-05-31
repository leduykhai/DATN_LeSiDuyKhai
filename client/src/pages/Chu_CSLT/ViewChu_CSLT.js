import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./ViewChu_CSLT.scss"

const View = () => {
    const [Chu_CSLT, setChu_CSLT] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/chucosoluutrus/${id}`)
            .then((resp) => setChu_CSLT({ ...resp.data[0] }));
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='Card'>
                <div className='Card-header'>
                    <p>Chu_CSLT Detail</p>
                </div>
                <div className='Container'>
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>FullName: </strong>
                    <span>{Chu_CSLT.ho_ten}</span>
                    <br />
                    <br />
                    <strong>Date of birth: </strong>
                    <span>{Chu_CSLT.ngay_sinh}</span>
                    <br />
                    <br />
                    <strong>Gender: </strong>
                    <span>{Chu_CSLT.gioi_tinh}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{Chu_CSLT.email}</span>
                    <br />
                    <br />
                    <strong>Phone Number: </strong>
                    <span>{Chu_CSLT.sdt}</span>
                    <br />
                    <br />
                    <strong>Citizen ID: </strong>
                    <span>{Chu_CSLT.cccd}</span>
                    <br />
                    <br />
                    <strong>Address: </strong>
                    <span>{Chu_CSLT.dia_chi}</span>
                    <br />
                    <br />
                    <Link to="/Chu_CSLT">
                        <div className='btn'>Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View