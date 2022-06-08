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
            msg.email = "Vui lòng nhập email"
        } else if (!isEmail(email)) {
            msg.email = "Email không đúng"
        }

        if (isEmpty(password)) {
            msg.password = "Vui lòng nhập mật khẩu"
        }

        if (isEmpty(ho_ten)) {
            msg.ho_ten = "Vui lòng nhập họ tên"
        }

        if (isEmpty(sdt)) {
            msg.sdt = "Vui lòng nhập số điện thoại"
        }

        // if (isEmpty(user_status_id)) {
        //     msg.user_status_id = "Vui lòng chọn trạng thái"
        // }

        // if (isEmpty(role_id)) {
        //     msg.role_id = "Vui lòng chọn vai trò"
        // }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !ho_ten || !sdt) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                var user_status_id = 2;
                axios
                    .post("http://localhost:3000/users", {
                        email,
                        password,
                        ho_ten,
                        sdt,
                        user_status_id,
                        // role_id,
                    })
                    .then(() => {
                        setState({
                            email: "",
                            password: "",
                            ho_ten: "",
                            sdt: "",
                            user_status_id: "",
                            // role_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Tiếp tục bước 2")
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
                <header className='header'>Đăng ký Quản lý lưu trú</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-dk_ac first-dk_ac">
                        <div className="details personal">
                            <span className="title-dk_ac">Bước 1: Nhập thông tin tài khoản</span>

                            <div className="fields-dk_ac">

                                <div className="input-field-dk_ac">
                                    <label className='label'>Họ tên</label>
                                    <input
                                        type="text"
                                        id='ho_ten'
                                        name='ho_ten'
                                        value={ho_ten || ""}
                                        placeholder="Nhập họ tên  . . ."
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
                                        placeholder="Nhập email . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.email}</p>
                                </div>

                                <div className="input-field-dk_ac">
                                    <label className='label'>Mật Khẩu</label>
                                    <input
                                        type="text"
                                        id='password'
                                        name='password'
                                        value={password || ""}
                                        placeholder="Nhập mật khẩu"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.password}</p>
                                </div>



                                <div className="input-field-dk_ac">
                                    <label className='label'>Số điện thoại</label>
                                    <input
                                        type="number"
                                        id='sdt'
                                        name='sdt'
                                        value={sdt || ""}
                                        placeholder="Nhập số điện thoại . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>

                                {/* <div className="input-field-dk_ac">
                                    <label className='label'>Trạng thái</label>
                                    <select
                                        type="select"
                                        id='user_status_id'
                                        name='user_status_id'
                                        value={user_status_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""}>--Trạng thái--</option> */}
                                {/* <option>--Select gender--</option> */}
                                {/* <option value={2}>Chờ Xác Nhận</option>
                                    </select>
                                </div> */}

                                {/* <div className="input-field-dk_ac">
                                    <label className='label'>Vai Trò</label>
                                    <select
                                        type="select"
                                        id='role_id'
                                        name='role_id'
                                        value={role_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""}>--Vai Trò--</option> */}
                                {/* <option>--Select gender--</option> */}
                                {/* <option value={3}>Chủ Cơ Sở Lưu Trú</option>
                                    </select>
                                </div> */}
                            </div>
                        </div>

                        <div className="details ID">

                            <div className="buttons">
                                <Link to="/client" className="backBtn">
                                    <div className="backBtn" >
                                        <i className="uil uil-navigator"></i>
                                        <span className="btnText">Huỷ</span>
                                    </div>
                                </Link>
                                <button className="submit" type='submit'>
                                    <span className="btnText">Tiếp Theo</span>
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