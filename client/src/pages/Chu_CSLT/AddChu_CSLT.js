import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddChu_CSLT.scss";
import axios from 'axios';
import { toast } from 'react-toastify';

import DropFileInput from '../../components/drop-file-input/DropFileInput';

const initialState = {
    ho_ten: "",
    ngay_sinh: "",
    gioi_tinh: "",
    email: "",
    cccd: "",
    dia_chi: "",
    sdt: "",
    hinh: "",
    user_id: "",
    phuong_id: "",
    nhanvien_id: ""
}

const AddChu_CSLT = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, ngay_sinh, gioi_tinh, email, cccd, dia_chi, sdt, hinh, user_id, phuong_id, nhanvien_id } = state;

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

        if (isEmpty(ho_ten)) {
            msg.ho_ten = "Please input your Name"
        }
        if (isEmpty(ngay_sinh)) {
            msg.ngay_sinh = "Please input your Date of birth"
        }
        if (isEmpty(gioi_tinh)) {
            msg.gioi_tinh = "Please input your Gender"
        }
        if (isEmpty(email)) {
            msg.email = "Please input your Email"
        } else if (!isEmail(email)) {
            msg.email = "Your email is incorrect"
        }
        if (isEmpty(cccd)) {
            msg.cccd = "Please input your Citizen ID"
        }
        if (isEmpty(dia_chi)) {
            msg.dia_chi = "Please input your Address"
        }
        if (isEmpty(sdt)) {
            msg.sdt = "Please input your Phone Number"
        }
        if (isEmpty(hinh)) {
            msg.hinh = "Please input your Images"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ho_ten || !ngay_sinh || !gioi_tinh || !email || !cccd || !dia_chi || !sdt || !hinh) {
            toast.error("please provide value into each input field");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                axios
                    .post("http://localhost:3000/chucosoluutrus", {
                        ho_ten,
                        ngay_sinh,
                        gioi_tinh,
                        email,
                        cccd,
                        dia_chi,
                        sdt,
                        hinh,
                        user_id,
                        phuong_id,
                        nhanvien_id,
                    })
                    .then(() => {
                        setState({
                            ho_ten: "",
                            ngay_sinh: "",
                            gioi_tinh: "",
                            email: "",
                            cccd: "",
                            dia_chi: "",
                            sdt: "",
                            hinh: "",
                            ngay_sinh: "",
                            user_id: "",
                            phuong_id: "",
                            nhanvien_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Users Added Successfully")
            }
            setTimeout(() => history.push("/Chu_CSLT"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <body className='body'>
            <div className="container-add">
                <header className='header'>Registration</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-add first-add">
                        <div className="details personal">
                            <span className="title-add">Personal Details</span>

                            <div className="fields-add">
                                <div className="input-field-add">
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

                                <div className="input-field-add">
                                    <label className='label'>Date of Birth</label>
                                    <input
                                        type="date"
                                        id='ngay_sinh'
                                        name='ngay_sinh'
                                        value={ngay_sinh || ""}
                                        placeholder="Enter birth date"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_sinh}</p>
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>Gender</label>
                                    <select
                                        type="text"
                                        required
                                        value={gioi_tinh || ""}
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected>Select gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                </div>

                                <div className="input-field-add">
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

                                <div className="input-field-add">
                                    <label className='label'>Citizen ID</label>
                                    <input
                                        type="number"
                                        id='cccd'
                                        name='cccd'
                                        value={cccd || ""}
                                        placeholder="Enter Citizen ID"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.cccd}</p>
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>Address</label>
                                    <input
                                        type="text"
                                        id='dia_chi'
                                        name='dia_chi'
                                        value={dia_chi || ""}
                                        placeholder="Enter your Address"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.dia_chi}</p>
                                </div>

                                <div className="input-field-add">
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
                                <div className="input-field-add">
                                    <label className='label'>Image</label>
                                    {/* <input
                                        type="file"
                                        id='hinh'
                                        name='hinh'
                                        value={hinh || ""}
                                        placeholder="Enter your Image"
                                        required
                                        onChange={handleInputChange}
                                    /> */}
                                    <DropFileInput
                                        type="file"
                                        id='hinh'
                                        name='hinh'
                                        value={hinh || ""}
                                        placeholder="Enter your Image"
                                        required
                                        onFileChange={(files) => onFileChange(files)}
                                    />
                                    <p className="error-text">{validationMsg.dia_chi}</p>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-add">Identity Details</span>

                            <div className="fields-add">
                                <div className="input-field-add">
                                    <label className='label'>ID User</label>
                                    <input
                                        type="number"
                                        id='user_id'
                                        name='user_id'
                                        value={user_id || ""}
                                        placeholder="Enter ID User"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>ID Ward</label>
                                    <input
                                        type="number"
                                        id='phuong_id'
                                        name='phuong_id'
                                        value={phuong_id || ""}
                                        placeholder="Enter ID Ward"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>ID Staff</label>
                                    <input
                                        type="number"
                                        id='nhanvien_id'
                                        name='nhanvien_id'
                                        value={nhanvien_id || ""}
                                        placeholder="Enter Staff"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="buttons">
                                <Link to="/Chu_CSLT" className="backBtn">
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

                    {/* <div className="form-add second-add">
                        <div className="details address">
                            <span className="title-add">Address Details</span>

                            <div className="fields-add">
                                <div className="input-field-add">
                                    <label className='label'>Address Type</label>
                                    <input
                                        type="text"
                                        placeholder="Permanent or Temporary"
                                        required
                                    />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>Nationality</label>
                                    <input type="text" placeholder="Enter nationality" required />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>State</label>
                                    <input type="text" placeholder="Enter your state" required />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>District</label>
                                    <input type="text" placeholder="Enter your district" required />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>Block Number</label>
                                    <input
                                        type="number"
                                        placeholder="Enter block number"
                                        required
                                    />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>Ward Number</label>
                                    <input type="number" placeholder="Enter ward number" required />
                                </div>
                            </div>
                        </div>

                        <div className="details family">
                            <span className="title-add">Family Details</span>

                            <div className="fields-add">
                                <div className="input-field-add">
                                    <label className='label'>Father Name</label>
                                    <input type="text" placeholder="Enter father name" required />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>Mother Name</label>
                                    <input type="text" placeholder="Enter mother name" required />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>Grandfather</label>
                                    <input
                                        type="text"
                                        placeholder="Enter grandfther name"
                                        required
                                    />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>Spouse Name</label>
                                    <input type="text" placeholder="Enter spouse name" required />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>Father in Law</label>
                                    <input type="text" placeholder="Father in law name" required />
                                </div>

                                <div className="input-field-add">
                                    <label className='label'>Mother in Law</label>
                                    <input type="text" placeholder="Mother in law name" required />
                                </div>
                            </div>

                            <div className="buttons">
                                <div className="backBtn" >
                                    <i className="uil uil-navigator"></i>
                                    <span className="btnText">Back</span>
                                </div>

                                <button className="sumbit">
                                    <span className="btnText">Submit</span>
                                    <i className="uil uil-navigator"></i>
                                </button>
                            </div>
                        </div>
                    </div> */}
                </form>
            </div>
        </body>
    )
}

export default AddChu_CSLT