import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import "./AddEdit.scss";
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    username: "",
    password: ""
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { username, password } = state;

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error("please provide value into each input field");
        } else {
            axios
                .post("http://localhost:3000/admins", {
                    username,
                    password
                })
                .then(() => {
                    setState({ username: "", password: "" });
                })
                .catch((err) => toast.error(err.response.data));
            setTimeout(() => history.push("/admin"), 300);
        }
    };

    const handleInputChange = (e) => {
        const { username, value } = e.target;
        setState({ ...state, [username]: value });
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
                onSubmit={handleSubmit}
            >
                <label htmlFor='username'>UserName</label>
                <input
                    type="text"
                    id='username'
                    name='username'
                    placeholder='username...'
                    value={username}
                    onChange={handleInputChange}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type="text"
                    id='password'
                    name='password'
                    placeholder='password...'
                    value={password}
                    onChange={handleInputChange}
                />
                <input type="submit" value="Save" />
                <Link to="/admin">
                    <input type="button" value="Go Back" />
                </Link>
            </form>
        </div>
    )
}

export default AddEdit