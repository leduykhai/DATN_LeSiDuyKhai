import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./ViewUser.scss"

const ViewUser = () => {
    const [user, setUser] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/users/${id}`)
            .then((resp) => setUser({ ...resp.data[0] }));
    }, [id]);

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
                    <strong>Vai Trò: </strong>
                    <span>{user.role_id}</span>
                    <br />
                    <br />
                    <strong>Trạng Thái: </strong>
                    <span>{user.user_status_id}</span>
                    <br />
                    <br />
                    <Link to="/users">
                        <div className='btn btn-edit'>Quay Lại</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewUser