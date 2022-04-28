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

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/admins/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error("please provide value into each input field");
        } else {
            if (!id) {
                axios
                    .post("http://localhost:3000/admins", {
                        username,
                        password
                    })
                    .then(() => {
                        setState({ username: "", password: "" });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Admin Added Successfully")
            } else {
                axios
                    .put(`http://localhost:3000/admins`, {
                        id,
                        username,
                        password
                    })
                    .then(() => {
                        setState({ username: "", password: "" });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Admin Update Successfully")
            }
            setTimeout(() => history.push("/admins"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
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
                    value={username || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type="text"
                    id='password'
                    name='password'
                    placeholder='password...'
                    value={password || ""}
                    onChange={handleInputChange}
                />
                <input type="submit" value={id ? "Update" : "Save"} />
                <Link to="/admins">
                    <input type="button" value="Go Back" />
                </Link>
            </form>
        </div>
    )
}

export default AddEdit