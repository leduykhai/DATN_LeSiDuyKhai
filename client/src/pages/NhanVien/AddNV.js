import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddNV.scss";
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    ho_ten: "",
    ngay_sinh: "",
    gioi_tinh: "",
    email: "",
    cccd: "",
    dia_chi: "",
    sdt: "",
    chuc_vu: "",
    // hinh: "",
    user_id: "",
    phuong_id: "",
    khuvuc_id: ""
}

const AddNV = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, ngay_sinh, gioi_tinh, email, cccd, dia_chi, sdt, chuc_vu, user_id, phuong_id, khuvuc_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [thanh_pho, setThanh_pho] = useState([]);
    const [thanh_pho_id, setThanh_pho_id] = useState('');

    const [quan, setQuan] = useState([]);
    const [quan_id, setQuan_id] = useState('');

    const [phuong, setPhuong] = useState([]);

    const [khu_vuc, setKhu_vuc] = useState([]);

    const [user, setUser] = useState([]);


    useEffect(() => {
        const getthanh_pho = async () => {
            const resthanh_pho = await fetch("http://localhost:3000/thanhphos");
            const restp = await resthanh_pho.json();
            setThanh_pho(await restp);
        }
        getthanh_pho();
    }, []);

    const handlethanh_pho = (event) => {
        const getThanh_pho_id = event.target.value;
        setThanh_pho_id(getThanh_pho_id);
    }

    useEffect(() => {
        const getquan = async () => {
            const resquan = await fetch(`http://localhost:3000/quans/${thanh_pho_id}`);
            const resq = await resquan.json();
            setQuan(await resq);
        }
        getquan();
    }, [thanh_pho_id]);

    const handlequan = (event) => {
        const getquan_id = event.target.value;
        setQuan_id(getquan_id);
    }

    useEffect(() => {
        const getphuong = async () => {
            const resphuong = await fetch(`http://localhost:3000/phuongs/${quan_id}`);
            const rp = await resphuong.json();
            setPhuong(await rp);
        }
        getphuong();
    }, [quan_id]);

    useEffect(() => {
        const getkhu_vuc = async () => {
            const reskhu_vuc = await fetch("http://localhost:3000/khuvucs");
            const reskv = await reskhu_vuc.json();
            setKhu_vuc(await reskv);
        }
        getkhu_vuc();
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const resuser = await fetch("http://localhost:3000/users");
            const resu = await resuser.json();
            setUser(await resu);
        }
        getUser();
    }, []);


    useEffect(() => {
        axios
            .get(`http://localhost:3000/nhanviens/${id}`)
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
        if (isEmpty(chuc_vu)) {
            msg.chuc_vu = "Please input your Position"
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
        if (!ho_ten || !ngay_sinh || !gioi_tinh || !email || !cccd || !dia_chi || !sdt || !chuc_vu) {
            toast.error("please provide value into each input field");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                axios
                    .post("http://localhost:3000/nhanviens", {
                        ho_ten,
                        ngay_sinh,
                        gioi_tinh,
                        email,
                        cccd,
                        dia_chi,
                        sdt,
                        chuc_vu,
                        // hinh,
                        user_id,
                        phuong_id,
                        khuvuc_id,
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
                            chuc_vu: "",
                            // hinh: "",
                            user_id: "",
                            phuong_id: "",
                            khuvuc_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Employee Added Successfully")
            }
            setTimeout(() => history.push("/nhanvien"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-addnv">
                <header className='header'>Registration</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-addnv first-addnv">
                        <div className="details personal">
                            <span className="title-addnv">Personal Details</span>

                            <div className="fields-addnv">
                                <div className="input-field-addnv">
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

                                <div className="input-field-addnv">
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

                                <div className="input-field-addnv">
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

                                <div className="input-field-addnv">
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

                                <div className="input-field-addnv">
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

                                <div className="input-field-addnv">
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

                                <div className="input-field-addnv">
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

                                <div className="input-field-addnv">
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

                                <div className="input-field-addnv">
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

                                <div className="input-field-addnv">
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
                                <div className="input-field-addnv">
                                    <label className='label'>Position</label>
                                    <select
                                        type="select"
                                        id='chuc_vu'
                                        name='chuc_vu'
                                        value={chuc_vu || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        {/* <option disabled selected>--Select gender--</option> */}
                                        <option disabled selected value={""}>--Select gender--</option>
                                        <option>Employee</option>
                                    </select>
                                </div>

                                <div className="input-field-addnv">
                                    <label className='label'>Area</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="khuvuc_id"
                                        id='khuvuc_id'
                                        value={khuvuc_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Select Area--</option>
                                        {
                                            khu_vuc.map((getkv, index) => (
                                                <option key={index} value={getkv.id}>{getkv.ten_khu_vuc} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                {/* <div className="input-field-addnv">
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
                            <span className="title-addnv">Identity Details</span>

                            <div className="fields-addnv">
                                <div className="input-field-addnv">
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
                            </div>
                            <div className="buttons">

                                <Link to="/nhanvien" className="backBtn">
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

export default AddNV