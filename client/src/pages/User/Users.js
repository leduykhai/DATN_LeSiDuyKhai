import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Users.scss";
import { toast } from 'react-toastify';
import axios from 'axios';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Users = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3000/users");
        setData(response.data);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if (
            window.confirm("Are you sure that you wanted to delete that user ?")
        ) {
            axios.delete(`http://localhost:3000/users/${id}`);
            toast.success("User Delete Successfully");
            setTimeout(() => loadData(), 100);
        }
    };

    return (
        <TableContainer component={Paper} className="table">
            <Link to={`/addUser`}>
                <button className='btn btn-add'>Add User</button>
            </Link>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">No.</TableCell>
                        <TableCell className="tableCell">ID</TableCell>
                        <TableCell className="tableCell">Email</TableCell>
                        <TableCell className="tableCell">Password</TableCell>
                        <TableCell className="tableCell">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell scope='row'>{index + 1}</TableCell>
                                <TableCell className="tableCell">{item.id}</TableCell>
                                <TableCell className="tableCell">{item.email}</TableCell>
                                <TableCell className="tableCell">{item.password}</TableCell>
                                <TableCell>
                                    <Link to={`/updateUser/${item.id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => { deleteContact(item.id) }}>Delete</button>
                                    <Link to={`/viewUser/${item.id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Users;