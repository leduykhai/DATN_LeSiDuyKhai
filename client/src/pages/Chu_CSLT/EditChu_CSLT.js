import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./EditChu_CSLT.scss";
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    email: "",
    sdt: ""
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { email, sdt } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/chucosoluutrus/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);


    const validateAll = () => {
        const msg = {}
        if (isEmpty(email)) {
            msg.email = "Please input your Email"
        } else if (!isEmail(email)) {
            msg.email = "Your email is incorrect"
        }

        if (isEmpty(sdt)) {
            msg.sdt = "Please input your Phone"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !sdt) {
            toast.error("please provide value into each input field");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
                axios
                    .put(`http://localhost:3000/chucosoluutrus`, {
                        id,
                        email,
                        sdt
                    })
                    .then(() => {
                        setState({ email: "", sdt: "" });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("User Update Successfully")
            }
            setTimeout(() => history.push("/Chu_CSLT"), 100);
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
                <label htmlFor='email'>Email</label>
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
                <label htmlFor='sdt'>Phone Number</label>
                <input
                    type="text"
                    className='text'
                    id='sdt'
                    name='sdt'
                    placeholder='phone number...'
                    value={sdt || ""}
                    onChange={handleInputChange}
                />
                <p className="error-text">{validationMsg.sdt}</p>
                <input type="submit" className='submit' value={id ? "Update" : "Save"} />
                <Link to="/Chu_CSLT">
                    <input type="button" className='button' value="Go Back" />
                </Link>
            </form>
        </div>
    )
}

export default AddEdit