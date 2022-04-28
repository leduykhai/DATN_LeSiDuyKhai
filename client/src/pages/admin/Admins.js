import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Admins.scss";
import { toast } from 'react-toastify';
import axios from 'axios';

const Admins = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3000/admins");
        setData(response.data);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if (
            window.confirm("Are you sure that you wanted to delete that admin ?")
        ) {
            axios.delete(`http://localhost:3000/admins/${id}`);
            toast.success("Admin Delete Successfully");
            setTimeout(() => loadData(), 100);
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <Link to={`/addAdmin`}>
                <button className='btn btn-add'>Add Admin</button>
            </Link>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>ID</th>
                        <th style={{ textAlign: "center" }}>Username</th>
                        <th style={{ textAlign: "center" }}>Password</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.password}</td>
                                <td>
                                    <Link to={`/updateAdmin/${item.id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => { deleteContact(item.id) }}>Delete</button>
                                    <Link to={`/viewAdmin/${item.id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Admins;