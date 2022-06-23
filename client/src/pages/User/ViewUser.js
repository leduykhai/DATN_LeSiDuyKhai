import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./ViewUser.scss"

const ViewUser = () => {
    const [user, setUser] = useState({});

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/users/${id}`)
            .then((resp) => setUser({ ...resp.data[0] }));
    }, [id]);

    const handleBack = (e) => {
        setTimeout(() => history.goBack(), 100);
    }

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='Card'>
                <div className='Card-header'>
                    <p>Chi tiết tài khoản</p>
                </div>
                <div className='Container'>
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Họ tên: </strong>
                    <span>{user.ho_ten}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <strong>Mật khẩu: </strong>
                    <span>{user.password}</span>
                    <br />
                    <br />
                    <strong>Số Điện thoại: </strong>
                    <span>{user.sdt}</span>
                    <br />
                    <br />

                    <div className='btn btn-edit' onClick={handleBack}>Quay Lại</div>

                </div>
            </div>
        </div>
    )
}

export default ViewUser