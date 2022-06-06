import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./DangKyAccount.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const initialState = {
    email: "",
    password: "",
    ho_ten: "",
    sdt: "",
    user_status_id: "",
    role_id: ""
}

const DangKyAccount = () => {
    const [state, setState] = useState(initialState);

    const { email, password, ho_ten, sdt, user_status_id, role_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [userstatus, setUser_Status] = useState([]);

    const [usersrole, setUser_Role] = useState([]);
    // const [khu_vuc_id, setKhu_vuc_id] = useState('');

    useEffect(() => {
        const getuser_status = async () => {
            const resuse_status = await fetch("http://localhost:3000/userstatus");
            const resus = await resuse_status.json();
            setUser_Status(await resus);
        }
        getuser_status();
    }, []);

    useEffect(() => {
        const getuser_role = async () => {
            const resuser_role = await fetch("http://localhost:3000/userrole");
            const resrl = await resuser_role.json();
            setUser_Role(await resrl);
        }
        getuser_role();
    }, []);

    // const handlekhu_vuc = (event) => {
    //     const getkhu_vuc_id = event.target.value;
    //     setKhu_vuc_id(getkhu_vuc_id);
    // }


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

        if (isEmpty(ho_ten)) {
            msg.ho_ten = "Please input your Name"
        }

        if (isEmpty(sdt)) {
            msg.sdt = "Please input your Phone Number"
        }

        if (isEmpty(user_status_id)) {
            msg.user_status_id = "Please input your Status"
        }

        if (isEmpty(role_id)) {
            msg.role_id = "Please input your Role"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !ho_ten || !sdt || !user_status_id || !role_id) {
            toast.error("please provide value into each input field");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                axios
                    .post("http://localhost:3000/users", {
                        email,
                        password,
                        ho_ten,
                        sdt,
                        user_status_id,
                        role_id,
                    })
                    .then(() => {
                        setState({
                            email: "",
                            password: "",
                            ho_ten: "",
                            sdt: "",
                            user_status_id: "",
                            role_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Proceed to step two")
            }
            setTimeout(() => history.push("/client_dk_b2"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-dk_ac">
                <header className='header'>Registration</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-dk_ac first-dk_ac">
                        <div className="details personal">
                            <span className="title-dk_ac">Step I: Account Information</span>

                            <div className="fields-dk_ac">

                                <div className="input-field-dk_ac">
                                    <label className='label'>Full Name</label>
                                    <input
                                        type="text"
                                        id='ho_ten'
                                        name='ho_ten'
                                        value={ho_ten || ""}
                                        placeholder="Enter your name"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div>

                                <div className="input-field-dk_ac">
                                    <label className='label'>Email</label>
                                    <input
                                        type="email"
                                        id='email'
                                        name='email'
                                        value={email || ""}
                                        placeholder="Enter your email"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.email}</p>
                                </div>

                                <div className="input-field-dk_ac">
                                    <label className='label'>Password</label>
                                    <input
                                        type="text"
                                        id='password'
                                        name='password'
                                        value={password || ""}
                                        placeholder="Enter your password"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.password}</p>
                                </div>



                                <div className="input-field-dk_ac">
                                    <label className='label'>Number Phone</label>
                                    <input
                                        type="number"
                                        id='sdt'
                                        name='sdt'
                                        value={sdt || ""}
                                        placeholder="Enter your Number Phone"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>

                                <div className="input-field-dk_ac">
                                    <label className='label'>Status</label>
                                    <select
                                        type="select"
                                        id='user_status_id'
                                        name='user_status_id'
                                        value={user_status_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""}>--Select Status--</option>
                                        {/* <option>--Select gender--</option> */}
                                        <option value={2}>Chờ Xác Nhận</option>
                                    </select>
                                </div>

                                <div className="input-field-dk_ac">
                                    <label className='label'>Role</label>
                                    <select
                                        type="select"
                                        id='role_id'
                                        name='role_id'
                                        value={role_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""}>--Select Role--</option>
                                        {/* <option>--Select gender--</option> */}
                                        <option value={3}>Chủ Cơ Sở Lưu Trú</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">

                            <div className="buttons">
                                <Link to="/client" className="backBtn">
                                    <div className="backBtn" >
                                        <i className="uil uil-navigator"></i>
                                        <span className="btnText">Back</span>
                                    </div>
                                </Link>
                                <button className="submit" type='submit'>
                                    <span className="btnText">Submit</span>
                                    <i className="uil uil-navigator"></i>
                                </button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </body>
    )
}

export default DangKyAccount