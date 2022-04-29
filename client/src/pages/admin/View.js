import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./View.scss"

const View = () => {
    const [user, setUser] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/admins/${id}`)
            .then((resp) => setUser({ ...resp.data[0] }));
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='Card'>
                <div className='Card-header'>
                    <p>Admin Detail</p>
                </div>
                <div className='Container'>
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>UserName: </strong>
                    <span>{user.username}</span>
                    <br />
                    <br />
                    <strong>PassWord: </strong>
                    <span>{user.password}</span>
                    <br />
                    <br />
                    <Link to="/admins">
                        <div className='btn btn-edit'>Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View