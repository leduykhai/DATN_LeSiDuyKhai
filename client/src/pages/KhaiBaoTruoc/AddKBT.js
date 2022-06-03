import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddKBT.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

// import Moment from 'react-moment';
// import 'moment-timezone';
// import moment from 'moment';

const initialState = {
    ho_ten: "",
    ngay_sinh: "",
    gioi_tinh: "",
    email: "",
    so_ho_chieu: "",
    dia_chi: "",
    sdt: "",
    ngay_dang_ky: "",
    ngay_den_luu_tru: "",
    // file: "",
    cslt_id: "",
    quoc_tich_id: "",
    kbt_status_id: ""
}

const AddKBT = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, ngay_sinh, gioi_tinh, email, so_ho_chieu, dia_chi, sdt, ngay_dang_ky, ngay_den_luu_tru, cslt_id, quoc_tich_id, kbt_status_id } = state;

    const [validationMsg, setValidationMsg] = useState({});

    const history = useHistory();

    const { id } = useParams();

    const [cslt, setCslt] = useState([]);

    const [quoctich, setQuoc_tich] = useState([]);

    const [kbt, setKbt] = useState([]);

    //CSLT
    useEffect(() => {
        const getCslt = async () => {
            const rescslt = await fetch("http://localhost:3000/cslts");
            const resc = await rescslt.json();
            setCslt(await resc);
        }
        getCslt();
    }, []);

    //Quoc_Tich
    useEffect(() => {
        const getquoc_tich = async () => {
            const resquoctich = await fetch("http://localhost:3000/quoctichs");
            const resqt = await resquoctich.json();
            setQuoc_tich(await resqt);
        }
        getquoc_tich();
    }, []);

    //kbt_status
    useEffect(() => {
        const getkbt = async () => {
            const reskbt = await fetch("http://localhost:3000/kbtstatus");
            const resk = await reskbt.json();
            setKbt(await resk);
        }
        getkbt();
    }, []);

    //Nguoi_nuoc_ngoai
    useEffect(() => {
        axios
            .get(`http://localhost:3000/khaibaotruocs/${id}`)
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
            msg.so_ho_chieu = "Please input your Passport ID"
        }
        if (isEmpty(dia_chi)) {
            msg.dia_chi = "Please input your Address"
        }
        if (isEmpty(sdt)) {
            msg.sdt = "Please input your Phone Number"
        }
        if (isEmpty(ngay_dang_ky)) {
            msg.ngay_dang_ky = "Please input your Date created"
        }
        if (isEmpty(ngay_den_luu_tru)) {
            msg.ngay_den_luu_tru = "Please input your arrival date "
        }
        // if (isEmpty(file)) {
        //     msg.file = "Please input your File"
        // }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ho_ten || !ngay_sinh || !gioi_tinh || !email || !so_ho_chieu || !dia_chi || !sdt || !ngay_den_luu_tru) {
            toast.error("please provide value into each input field");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                var ngay_dang_ky = moment(ngay_dang_ky).format('YYYY-MM-DD hh:mm:ss')
                axios
                    .post("http://localhost:3000/khaibaotruocs", {
                        ho_ten,
                        ngay_sinh,
                        gioi_tinh,
                        email,
                        so_ho_chieu,
                        dia_chi,
                        sdt,
                        ngay_dang_ky,
                        ngay_den_luu_tru,
                        // file,
                        cslt_id,
                        quoc_tich_id,
                        kbt_status_id
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
                            ngay_den_luu_tru: "",
                            // file: "",
                            cslt_id: "",
                            quoc_tich_id: "",
                            kbt_status_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("KBT Added Successfully")
            }
            setTimeout(() => history.push("/kbt"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-addkbt">
                <header className='header'>Registration</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-addkbt first-addkbt">
                        <div className="details personal">
                            <span className="title-addkbt">Personal Details</span>

                            <div className="fields-addkbt">
                                <div className="input-field-addkbt">
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

                                <div className="input-field-addkbt">
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

                                <div className="input-field-addkbt">
                                    <label className='label'>Gender</label>
                                    <select
                                        type="select"
                                        id='gioi_tinh'
                                        name='gioi_tinh'
                                        value={gioi_tinh || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""} > --Select gender--</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                </div>

                                <div className="input-field-addkbt">
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

                                <div className="input-field-addkbt">
                                    <label className='label'>Passport ID</label>
                                    <input
                                        type="text"
                                        id='so_ho_chieu'
                                        name='so_ho_chieu'
                                        value={so_ho_chieu || ""}
                                        placeholder="Enter Passport ID"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.so_ho_chieu}</p>
                                </div>

                                <div className="input-field-addkbt">
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

                                <div className="input-field-addkbt">
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
                                        <option disabled selected value="">--Select Nationality--</option>
                                        {
                                            quoctich.map((getqt, index) => (
                                                <option key={index} value={getqt.id}> {getqt.ten_quoc_tich} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addkbt">
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

                                <div className="input-field-addkbt">
                                    <label className='label'>Date Created</label>
                                    <input
                                        type="date"
                                        id='ngay_dang_ky'
                                        name='ngay_dang_ky'
                                        // value={moment(ngay_dang_ky).format('YYYY-MM-DD') || ""}
                                        placeholder="Enter birth date"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_dang_ky}</p>

                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>Arrival Date</label>
                                    <input
                                        type="date"
                                        id='ngay_den_luu_tru'
                                        name='ngay_den_luu_tru'
                                        value={ngay_den_luu_tru || ""}
                                        placeholder="Enter Arrival date"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_den_luu_tru}</p>

                                </div>

                                <div className="input-field-addkbt">
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
                                        <option disabled selected value="">--Select CSLT--</option>
                                        {
                                            cslt.map((getcslt, index) => (
                                                <option key={index} value={getcslt.id}>{getcslt.ten_cslt} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>Status</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="kbt_status_id"
                                        id='kbt_status_id'
                                        value={kbt_status_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Select Status--</option>
                                        {
                                            kbt.map((getkbt, index) => (
                                                <option key={index} value={getkbt.id}>{getkbt.status_name} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-addkbt">Identity Details</span>

                            <div className="fields-addkbt">

                            </div>
                            <div className="buttons">
                                <Link to="/kbt" className="backBtn">
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

export default AddKBT