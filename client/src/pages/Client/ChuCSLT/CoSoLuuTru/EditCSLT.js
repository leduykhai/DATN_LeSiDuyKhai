import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./EditCSLT.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

const initialState = {
    ten_cslt: "",
    loai_cslt: "",
    nguoi_dai_dien: "",
    sdt: "",
    email: "",
    dia_chi: "",
    // file: "",
    chu_cslt_id: "",
    phuong_id: ""
}

const EditCSLT = () => {
    const [state, setState] = useState(initialState);

    const { ten_cslt, loai_cslt, nguoi_dai_dien, sdt, email, dia_chi, chu_cslt_id, phuong_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [thanh_pho, setThanh_pho] = useState([]);
    const [thanh_pho_id, setThanh_pho_id] = useState('');
    const [quan, setQuan] = useState([]);
    const [quan_id, setQuan_id] = useState('');
    const [phuong, setPhuong] = useState([]);

    const [Chu_CSLT, setChu_CSLT] = useState([]);

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
            const resquan = await fetch(`http://localhost:3000/quans/${48}`);
            const resq = await resquan.json();
            setQuan(await resq);
        }
        getquan();
    }, [48]);

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
        const getChu_CSLT = async () => {
            const resccslt = await fetch("http://localhost:3000/chucosoluutrus");
            const rescc = await resccslt.json();
            setChu_CSLT(await rescc);
        }
        getChu_CSLT();
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/cslts/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);


    const validateAll = () => {
        const msg = {}

        if (isEmpty(ten_cslt)) {
            msg.ten_cslt = "Vui lòng nhập Tên cslt"
        }
        if (isEmpty(loai_cslt)) {
            msg.loai_cslt = "Vui lòng Loại cslt"
        }
        if (isEmpty(nguoi_dai_dien)) {
            msg.nguoi_dai_dien = "Vui lòng nhập tên người đại diện"
        }
        if (isEmpty(email)) {
            msg.email = "Please input your Email"
        } else if (!isEmail(email)) {
            msg.email = "Your email is incorrect"
        }
        if (isEmpty(sdt)) {
            msg.sdt = "Please input your Number Phone"
        }
        if (isEmpty(dia_chi)) {
            msg.dia_chi = "Please input your Address"
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
        if (!ten_cslt || !loai_cslt || !nguoi_dai_dien || !sdt || !email || !dia_chi) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
                axios
                    .put("http://localhost:3000/cslts", {
                        id,
                        ten_cslt,
                        loai_cslt,
                        nguoi_dai_dien,
                        sdt,
                        email,
                        dia_chi,
                        // file,
                        chu_cslt_id,
                        phuong_id,
                    })
                    .then(() => {
                        setState({
                            ten_cslt: "",
                            loai_cslt: "",
                            nguoi_dai_dien: "",
                            sdt: "",
                            email: "",
                            dia_chi: "",
                            //file: "",
                            chu_cslt_id: "",
                            phuong_id: "",
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Cập nhật thành công!")
            }
            setTimeout(() => history.goBack(), 100);
        }
    };

    const handleBack = (e) => {
        setTimeout(() => history.goBack(), 100);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-editcslt">
                <header className='header'>Cập nhật</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-editcslt first-editcslt">
                        <div className="details personal">
                            <span className="title-editcslt">Thông Tin Cơ Sở Lưu Trú</span>

                            <div className="fields-editcslt">
                                <div className="input-field-editcslt">
                                    <label className='label'>Tên Cơ Sở Lưu Trú</label>
                                    <input
                                        type="text"
                                        id='ten_cslt'
                                        name='ten_cslt'
                                        value={ten_cslt || ""}
                                        placeholder="Nhập Tên CSLT . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ten_cslt}</p>
                                </div>

                                <div className="input-field-editcslt">
                                    <label className='label'>Loại Cơ Sở Lưu Trú</label>
                                    <select
                                        type="select"
                                        id='loai_cslt'
                                        name='loai_cslt'
                                        value={loai_cslt || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""}>--Chọn Loại CSLT--</option>
                                        {/* <option>--Select gender--</option> */}
                                        <option>CC - Chung cư, cơ sở y tế, ký túc xá</option>
                                        <option>KCN - Khu công nghiệp, chế xuất</option>
                                        <option>KS - Khách sạn, nhà trọ</option>
                                        <option>NDKD - Nhà dân kinh doanh</option>
                                        <option>VL - Nhà dân không kinh doanh</option>
                                    </select>
                                </div>

                                <div className="input-field-editcslt">
                                    <label className='label'>Người Đại Diện</label>
                                    <input
                                        type="text"
                                        id='nguoi_dai_dien'
                                        name='nguoi_dai_dien'
                                        value={nguoi_dai_dien || ""}
                                        placeholder="Nhập Tên Người Đại Diện . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.nguoi_dai_dien}</p>
                                </div>

                                <div className="input-field-editcslt">
                                    <label className='label'>Số Điện Thoại</label>
                                    <input
                                        type="number"
                                        id='sdt'
                                        name='sdt'
                                        value={sdt || ""}
                                        placeholder="Nhập Số Điện Thoại . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>

                                <div className="input-field-editcslt">
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

                                <div className="input-field-editcslt">
                                    <label className='label'>Địa Chỉ</label>
                                    <input
                                        type="text"
                                        id='dia_chi'
                                        name='dia_chi'
                                        value={dia_chi || ""}
                                        placeholder="Nhập Địa Chỉ"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.dia_chi}</p>
                                </div>

                                {/* <div className="input-field-editcslt">
                                    <label className='label'>Thành Phố</label>
                                    <select
                                        className="form-control p-2"
                                        name="thanh_pho"
                                        id='thanh_pho'
                                        // required
                                        onChange={(e) => handlethanh_pho(e)}
                                    >
                                        <option disabled selected value="">--Chọn Thành Phố--</option>
                                        {
                                            thanh_pho.map((getcity, index) => (
                                                <option key={index} value={getcity.id} >{getcity.ten_thanh_pho} </option>
                                            ))
                                        }
                                    </select>
                                </div> */}

                                <div className="input-field-editcslt">
                                    <label className='label'>Quận</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="district"
                                        id='district'
                                        // required
                                        onChange={(e) => handlequan(e)}
                                    >
                                        <option disabled selected value="">--Chọn Quận--</option>
                                        {
                                            quan.map((getdistrict, index) => (
                                                <option key={index} value={getdistrict.id}>{getdistrict.ten_quan} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-editcslt">
                                    <label className='label'>Phường</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="phuong_id"
                                        id='phuong_id'
                                        value={phuong_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Chọn Phường--</option>
                                        {
                                            phuong.map((getward, index) => (
                                                <option key={index} value={getward.id}> {getward.ten_phuong} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="input-field-editcslt">

                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-editcslt"></span>

                            <div className="fields-editcslt">
                                <div className="input-field-editcslt">
                                    <label className='label'>Tài Khoản</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="chu_cslt_id"
                                        id='chu_cslt_id'
                                        value={chu_cslt_id || ""}
                                        required
                                        disabled
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Tên Tài Khoản--</option>
                                        {
                                            Chu_CSLT.map((getc, index) => (
                                                <option key={index} value={getc.id}>{getc.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="buttons">

                                {/* <Link to="/chu_cslt" className="backBtn"> */}
                                <div className="backBtn" onClick={handleBack}>
                                    <i className="uil uil-navigator"></i>
                                    <span className="btnText">Quay Lại</span>
                                </div>
                                {/* </Link> */}
                                <button className="submit" type='submit'>
                                    <span className="btnText">Cập Nhật</span>
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

export default EditCSLT