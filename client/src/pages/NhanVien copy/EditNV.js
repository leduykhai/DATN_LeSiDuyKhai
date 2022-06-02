import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./EditNV.scss";
import axios from 'axios';
import { toast } from 'react-toastify';

import Moment from 'react-moment';
// import 'moment-timezone';
import moment from 'moment';

const initialState = {
    ho_ten: "",
    ngay_sinh: "",
    gioi_tinh: "",
    email: "",
    so_ho_chieu: "",
    dia_chi: "",
    sdt: "",
    ngay_dang_ky: "",
    // hinh: "",
    user_id: "",
    quoc_tich_id: "",
    cslt_id: ""
}

const EditChuCSLT = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, ngay_sinh, gioi_tinh, email, so_ho_chieu, dia_chi, sdt, ngay_dang_ky, user_id, quoc_tich_id, cslt_id } = state;

    const [validationMsg, setValidationMsg] = useState({});

    const history = useHistory();

    const { id } = useParams();

    const [thanh_pho, setThanh_pho] = useState([]);
    const [thanh_pho_id, setThanh_pho_id] = useState('');
    const [quan, setQuan] = useState([]);
    const [quan_id, setQuan_id] = useState('');
    const [phuong, setPhuong] = useState([]);

    const [cslt, setCslt] = useState([]);
    const [khu_vuc_id, setKhu_vuc_id] = useState('');

    const [quoctich, setQuoc_tich] = useState([]);

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
            const reskhu_vuc = await fetch("http://localhost:3000/cslts");
            const reskv = await reskhu_vuc.json();
            setCslt(await reskv);
        }
        getkhu_vuc();
    }, []);

    const handlekhu_vuc = (event) => {
        const getkhu_vuc_id = event.target.value;
        setKhu_vuc_id(getkhu_vuc_id);
    }


    useEffect(() => {
        const getquoc_tich = async () => {
            const resquoctich = await fetch("http://localhost:3000/quoctichs");
            const resqt = await resquoctich.json();
            setQuoc_tich(await resqt);
        }
        getquoc_tich();
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
            .get(`http://localhost:3000/nguoinuocngoais/${id}`)
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
        if (isEmpty(so_ho_chieu)) {
            msg.so_ho_chieu = "Please input your Citizen ID"
        }
        if (isEmpty(dia_chi)) {
            msg.dia_chi = "Please input your Address"
        }
        if (isEmpty(sdt)) {
            msg.sdt = "Please input your Phone Number"
        }
        if (isEmpty(ngay_dang_ky)) {
            msg.ngay_dang_ky = "Please input your Role"
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
        if (!ho_ten || !gioi_tinh || !email || !so_ho_chieu || !dia_chi || !sdt || !ngay_dang_ky) {
            toast.error("please provide value into each input field");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
                var ngay_sinh = moment(ngay_sinh).format('YYYY-MM-DD');
                axios
                    .put("http://localhost:3000/nhanviens", {
                        id,
                        ho_ten,
                        ngay_sinh,
                        gioi_tinh,
                        email,
                        so_ho_chieu,
                        dia_chi,
                        sdt,
                        ngay_dang_ky,
                        // hinh,
                        user_id,
                        quoc_tich_id,
                        cslt_id,
                    })
                    .then(() => {
                        setState({
                            ho_ten: "",
                            ngay_sinh: "",
                            gioi_tinh: "",
                            email: "",
                            so_ho_chieu: "",
                            dia_chi: "",
                            sdt: "",
                            ngay_dang_ky: "",
                            // hinh: "",
                            user_id: "",
                            quoc_tich_id: "",
                            cslt_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Users Added Successfully")
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
            <div className="container-edit">
                <header className='header'>Registration</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-edit first-edit">
                        <div className="details personal">
                            <span className="title-edit">Personal Details</span>

                            <div className="fields-edit">
                                <div className="input-field-edit">
                                    <label className='label'>Full Name</label>
                                    <input
                                        type="text"
                                        id='ho_ten'
                                        name='ho_ten'
                                        value={ho_ten || ""}
                                        placeholder="Enter your Name"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>Date of Birth</label>
                                    <input
                                        type="date"
                                        id='ngay_sinh'
                                        name='ngay_sinh'
                                        value={moment(ngay_sinh).format('YYYY-MM-DD') || ""}
                                        placeholder="Enter birth date"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_sinh}</p>

                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>Gender</label>
                                    <select
                                        type="select"
                                        id='gioi_tinh'
                                        name='gioi_tinh'
                                        value={gioi_tinh || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected >Select gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                </div>

                                <div className="input-field-edit">
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

                                <div className="input-field-edit">
                                    <label className='label'>Citizen ID</label>
                                    <input
                                        type="text"
                                        id='so_ho_chieu'
                                        name='so_ho_chieu'
                                        value={so_ho_chieu || ""}
                                        placeholder="Enter Citizen ID"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.so_ho_chieu}</p>
                                </div>

                                <div className="input-field-edit">
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

                                <div className="input-field-edit">
                                    <label className='label'>City</label>
                                    <select name="thanh_pho" className="form-control p-2" onChange={(e) => handlethanh_pho(e)} >
                                        <option value="">--Select City--</option>
                                        {
                                            thanh_pho.map((getcity, index) => (
                                                <option key={index} value={getcity.id} >{getcity.ten_thanh_pho} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>District</label>
                                    <select
                                        className="form-select"
                                        name="state"
                                        onChange={(e) => handlequan(e)}
                                    >
                                        <option value="">--Select District--</option>
                                        {
                                            quan.map((getdistrict, index) => (
                                                <option key={index} value={getdistrict.id}>{getdistrict.ten_quan} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>Nationality</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="quoc_tich_id"
                                        id='quoc_tich_id'
                                        value={quoc_tich_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option value="">--Select Nationality--</option>
                                        {
                                            quoctich.map((getqt, index) => (
                                                <option key={index} value={getqt.id}> {getqt.ten_quoc_tich} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-edit">
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

                                <div className="input-field-edit">
                                    <label className='label'>Date Created</label>
                                    <input
                                        type="date"
                                        id='ngay_dang_ky'
                                        name='ngay_dang_ky'
                                        value={moment(ngay_dang_ky).format('YYYY-MM-DD') || ""}
                                        placeholder="Enter birth date"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_dang_ky}</p>

                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>CSLT</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="cslt_id"
                                        id='cslt_id'
                                        value={cslt_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option value="">--Select CSLT--</option>
                                        {
                                            cslt.map((getcslt, index) => (
                                                <option key={index} value={getcslt.id}>{getcslt.ten_cslt} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                {/* <div className="input-field-edit">
                                    <label className='label'>Position</label>
                                    <input
                                        type="text"
                                        id='chuc_vu'
                                        name='chuc_vu'
                                        value={chuc_vu || ""}
                                        placeholder="Enter your Position"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div> */}
                                {/* <div className="input-field-edit">
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
                                    <p className="error-text">{validationMsg.hinh}</p>
                                </div> */}
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-edit">Identity Details</span>

                            <div className="fields-edit">

                                <div className="input-field-edit">
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
                                        <option value="">--Select User ID--</option>
                                        {
                                            user.map((getus, index) => (
                                                <option key={index} value={getus.id}>{getus.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>ID User</label>
                                    <input
                                        type="number"
                                        id='user_id'
                                        name='user_id'
                                        value={user_id || ""}
                                        disabled
                                        placeholder="Enter ID User"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* <div className="input-field-edit">
                                    <label className='label'>ID Ward</label>
                                    <input
                                        type="number"
                                        id='phuong_id'
                                        name='phuong_id'
                                        value={phuong_id || ""}
                                        disabled
                                        placeholder="Enter ID Ward"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>ID Staff</label>
                                    <input
                                        type="number"
                                        id='khuvuc_id'
                                        name='khuvuc_id'
                                        value={khuvuc_id || ""}
                                        disabled
                                        placeholder="Enter Staff"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div> */}
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

                    {/* <div className="form-edit second-edit">
                        <div className="details address">
                            <span className="title-edit">Address Details</span>

                            <div className="fields-edit">
                                <div className="input-field-edit">
                                    <label className='label'>Address Type</label>
                                    <input
                                        type="text"
                                        placeholder="Permanent or Temporary"
                                        required
                                    />
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>Nationality</label>
                                    <input type="text" placeholder="Enter nationality" required />
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>State</label>
                                    <input type="text" placeholder="Enter your state" required />
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>District</label>
                                    <input type="text" placeholder="Enter your district" required />
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>Block Number</label>
                                    <input
                                        type="number"
                                        placeholder="Enter block number"
                                        required
                                    />
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>Ward Number</label>
                                    <input type="number" placeholder="Enter ward number" required />
                                </div>
                            </div>
                        </div>

                        <div className="details family">
                            <span className="title-edit">Family Details</span>

                            <div className="fields-edit">
                                <div className="input-field-edit">
                                    <label className='label'>Father Name</label>
                                    <input type="text" placeholder="Enter father name" required />
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>Mother Name</label>
                                    <input type="text" placeholder="Enter mother name" required />
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>Grandfather</label>
                                    <input
                                        type="text"
                                        placeholder="Enter grandfther name"
                                        required
                                    />
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>Spouse Name</label>
                                    <input type="text" placeholder="Enter spouse name" required />
                                </div>

                                <div className="input-field-edit">
                                    <label className='label'>Father in Law</label>
                                    <input type="text" placeholder="Father in law name" required />
                                </div>

                                <div className="input-field-edit">
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

export default EditChuCSLT