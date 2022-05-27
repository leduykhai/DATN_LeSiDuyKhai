import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./EditUser.scss";
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    email: "",
    password: ""
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { email, password } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/users/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);


    const validateAll = () => {
        const msg = {}
        if (isEmpty(email)) {
            msg.email = "Please input your Email"
        } else if (!isEmail(email)) {
            msg.email = "Your email is incorrect"
        }

        if (isEmpty(password)) {
            msg.password = "Please input your Password"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("please provide value into each input field");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            // if (!id) {
            //     axios
            //         .post("http://localhost:3000/users", {
            //             email,
            //             password
            //         })
            //         .then(() => {
            //             setState({ email: "", password: "" });
            //         })
            //         .catch((err) => toast.error(err.response.data));
            //     toast.success("Users Added Successfully")
            // }
            // else {
            if (id) {
                axios
                    .put(`http://localhost:3000/users`, {
                        id,
                        email,
                        password
                    })
                    .then(() => {
                        setState({ email: "", password: "" });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("User Update Successfully")
            }
            setTimeout(() => history.push("/users"), 100);
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
                <label htmlFor='email'>UserName</label>
                <input
                    type="text"
                    className='text'
                    id='email'
                    name='email'
                    placeholder='email...'
                    value={email || ""}
                    onChange={handleInputChange}
                />
                <p className="error-text">{validationMsg.email}</p>
                <label htmlFor='password'>Password</label>
                <input
                    type="text"
                    className='text'
                    id='password'
                    name='password'
                    placeholder='password...'
                    value={password || ""}
                    onChange={handleInputChange}
                />
                <p className="error-text">{validationMsg.password}</p>
                <input type="submit" className='submit' value={id ? "Update" : "Save"} />
                <Link to="/users">
                    <input type="button" className='button' value="Go Back" />
                </Link>
            </form>
        </div>
    )
}

export default AddEdit