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
                    <p>User Detail</p>
                </div>
                <div className='Container'>
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Name: </strong>
                    <span>{user.ho_ten}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <strong>PassWord: </strong>
                    <span>{user.password}</span>
                    <br />
                    <br />
                    <strong>Phone: </strong>
                    <span>{user.sdt}</span>
                    <br />
                    <br />
                    <strong>Role: </strong>
                    <span>{user.role_id}</span>
                    <br />
                    <br />
                    <strong>Status: </strong>
                    <span>{user.user_status_id}</span>
                    <br />
                    <br />
                    <Link to="/users">
                        <div className='btn btn-edit'>Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewUser