import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddChuCSLT.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const initialState = {
    ho_ten: "",
    ngay_sinh: "",
    gioi_tinh: "",
    email: "",
    cccd: "",
    dia_chi: "",
    sdt: "",
    // hinh: "",
    user_id: "",
    phuong_id: "",
    nhanvien_id: ""
}

const AddChuCSLT = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, ngay_sinh, gioi_tinh, email, cccd, dia_chi, sdt, user_id, phuong_id, nhanvien_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [thanh_pho, setThanh_pho] = useState([]);
    const [thanh_pho_id, setThanh_pho_id] = useState('');

    const [quan, setQuan] = useState([]);
    const [quan_id, setQuan_id] = useState('');

    const [phuong, setPhuong] = useState([]);

    const [user, setUser] = useState([]);

    const [nhanvien, setNhanvien] = useState([]);

    //thanh pho
    useEffect(() => {
        const getthanh_pho = async () => {
            const resthanh_pho = await fetch("http://localhost:3000/thanhphos");
            const restp = await resthanh_pho.json();
            setThanh_pho(await restp);
        }
        getthanh_pho();
    }, []);

    //id thanh pho
    const handlethanh_pho = (event) => {
        const getThanh_pho_id = event.target.value;
        setThanh_pho_id(getThanh_pho_id);
    }

    //quan
    useEffect(() => {
        const getquan = async () => {
            const resquan = await fetch(`http://localhost:3000/quans/${thanh_pho_id}`);
            const resq = await resquan.json();
            setQuan(await resq);
        }
        getquan();
    }, [thanh_pho_id]);

    //id quan
    const handlequan = (event) => {
        const getquan_id = event.target.value;
        setQuan_id(getquan_id);
    }

    //phuong
    useEffect(() => {
        const getphuong = async () => {
            const resphuong = await fetch(`http://localhost:3000/phuongs/${quan_id}`);
            const rp = await resphuong.json();
            setPhuong(await rp);
        }
        getphuong();
    }, [quan_id]);

    //user
    useEffect(() => {
        const getUser = async () => {
            const resuser = await fetch("http://localhost:3000/users");
            const resu = await resuser.json();
            setUser(await resu);
        }
        getUser();
    }, []);

    //nhan vien
    useEffect(() => {
        const getNV = async () => {
            const resnhanvien = await fetch("http://localhost:3000/nhanviens");
            const resnv = await resnhanvien.json();
            setNhanvien(await resnv);
        }
        getNV();
    }, []);

    //chu co so luu tru
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
        // if (isEmpty(hinh)) {
        //     msg.hinh = "Please input your Images"
        // }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ho_ten || !ngay_sinh || !gioi_tinh || !email || !cccd || !dia_chi || !sdt) {
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
                        // hinh,
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
                            // hinh: "",
                            user_id: "",
                            phuong_id: "",
                            nhanvien_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("ChuCSLT Added Successfully")
            }
            setTimeout(() => history.push("/chucslt"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-addccslt">
                <header className='header'>Registration</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-addccslt first-addccslt">
                        <div className="details personal">
                            <span className="title-addccslt">Personal Details</span>

                            <div className="fields-addccslt">
                                <div className="input-field-addccslt">
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

                                <div className="input-field-addccslt">
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

                                <div className="input-field-addccslt">
                                    <label className='label'>Gender</label>
                                    <select
                                        type="select"
                                        id='gioi_tinh'
                                        name='gioi_tinh'
                                        value={gioi_tinh || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""}>--Select gender--</option>
                                        {/* <option>--Select gender--</option> */}
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                </div>

                                <div className="input-field-addccslt">
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

                                <div className="input-field-addccslt">
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

                                <div className="input-field-addccslt">
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

                                <div className="input-field-addccslt">
                                    <label className='label'>City</label>
                                    <select
                                        className="form-control p-2"
                                        name="thanh_pho"
                                        id='thanh_pho'
                                        required
                                        onChange={(e) => handlethanh_pho(e)}
                                    >
                                        <option disabled selected value="">--Select City--</option>
                                        {
                                            thanh_pho.map((getcity, index) => (
                                                <option key={index} value={getcity.id} >{getcity.ten_thanh_pho} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addccslt">
                                    <label className='label'>District</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="district"
                                        id='district'
                                        required
                                        onChange={(e) => handlequan(e)}
                                    >
                                        <option disabled selected value="">--Select District--</option>
                                        {
                                            quan.map((getdistrict, index) => (
                                                <option key={index} value={getdistrict.id}>{getdistrict.ten_quan} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addccslt">
                                    <label className='label'>Ward</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="phuong_id"
                                        id='phuong_id'
                                        value={phuong_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Select Ward--</option>
                                        {
                                            phuong.map((getward, index) => (
                                                <option key={index} value={getward.id}> {getward.ten_phuong} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addccslt">
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
                                {/* <div className="input-field-addccslt">
                                    <label className='label'>Image</label>
                                    <input
                                        type="file"
                                        id='hinh'
                                        name='hinh'
                                        value={hinh || ""}
                                        placeholder="Enter your Image"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.dia_chi}</p>
                                </div> */}
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-addccslt">Identity Details</span>

                            <div className="fields-addccslt">
                                <div className="input-field-addccslt">
                                    <label className='label'>User ID</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="user_id"
                                        id='user_id'
                                        value={user_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Select User ID--</option>
                                        {
                                            user.map((getus, index) => (
                                                <option key={index} value={getus.id}>{getus.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addccslt">
                                    <label className='label'>Employee ID</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="nhanvien_id"
                                        id='nhanvien_id'
                                        value={nhanvien_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Select Employee ID--</option>
                                        {
                                            nhanvien.map((getnv, index) => (
                                                <option key={index} value={getnv.id}>{getnv.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addccslt">

                                </div>
                            </div>
                            <div className="buttons">
                                <Link to="/chucslt" className="backBtn">
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

export default AddChuCSLT