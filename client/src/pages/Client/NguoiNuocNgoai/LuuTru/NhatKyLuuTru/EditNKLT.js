import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./EditNKLT.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


const initialState = {
    ten_diem_den: "",
    dia_chi_diem_den: "",
    thoi_gian_den: "",
    thoi_gian_roi_di: "",
    ghi_chu: "",
    luu_trus_id: "",
    phuong_id: ""
}

const EditNKLT = () => {
    const [state, setState] = useState(initialState);

    const { ten_diem_den, dia_chi_diem_den, thoi_gian_den, thoi_gian_roi_di, ghi_chu, luu_trus_id, phuong_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [lt, setLt] = useState([]);

    const [thanh_pho, setThanh_pho] = useState([]);
    const [thanh_pho_id, setThanh_pho_id] = useState('');

    const [quan, setQuan] = useState([]);
    const [quan_id, setQuan_id] = useState('');

    const [phuong, setPhuong] = useState([]);

    //luu tru
    useEffect(() => {
        const getLT = async () => {
            const reslt = await fetch("http://localhost:3000/luutrus");
            const resl = await reslt.json();
            setLt(await resl);
        }
        getLT();
    }, []);

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

    useEffect(() => {
        axios
            .get(`http://localhost:3000/nhatkyluutrus/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);


    const validateAll = () => {
        const msg = {}

        if (isEmpty(ten_diem_den)) {
            msg.ten_diem_den = "Vui lòng nhập tên điểm đến"
        }

        if (isEmpty(dia_chi_diem_den)) {
            msg.dia_chi_diem_den = "Vui lòng nhập địa chỉ điểm đến"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ten_diem_den || !dia_chi_diem_den) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
                axios
                    .put("http://localhost:3000/nhatkyluutrus", {
                        id,
                        // ten_diem_den,
                        // dia_chi_diem_den,
                        // thoi_gian_den,
                        // thoi_gian_roi_di,
                        ghi_chu,
                        // luu_trus_id,
                        // phuong_id
                    })
                    .then(() => {
                        setState({
                            ten_diem_den: "",
                            dia_chi_diem_den: "",
                            thoi_gian_den: "",
                            thoi_gian_roi_di: "",
                            ghi_chu: "",
                            luu_trus_id: "",
                            phuong_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Cập nhật thành công!")
            }
            setTimeout(() => history.goBack(), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleBack = (e) => {
        setTimeout(() => history.goBack(), 100);
    }

    return (
        <body className='body'>
            <div className="container-editnklt">
                <header className='header'>Cập nhật nhật ký lưu trú</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-editnklt first-editnklt">
                        <div className="details personal">
                            <span className="title-editnklt">Thông tin nhật ký lưu trú</span>

                            <div className="fields-editnklt">
                                <div className="input-field-editnklt">
                                    <label className='label'>Tên điểm đến</label>
                                    <input
                                        type="text"
                                        id='ten_diem_den'
                                        name='ten_diem_den'
                                        value={ten_diem_den || ""}
                                        disabled
                                        placeholder="Nhập tên điểm đến . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ten_diem_den}</p>
                                </div>

                                <div className="input-field-editnklt">
                                    <label className='label'>Địa chỉ điểm đến</label>
                                    <input
                                        type="text"
                                        id='dia_chi_diem_den'
                                        name='dia_chi_diem_den'
                                        value={dia_chi_diem_den || ""}
                                        disabled
                                        placeholder="Nhập địa chỉ điểm đến . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.dia_chi_diem_den}</p>
                                </div>

                                <div className="input-field-editnklt">

                                </div>

                                <div className="input-field-editnklt">
                                    <label className='label'>Thành phố</label>
                                    <select
                                        className="form-control p-2"
                                        name="thanh_pho"
                                        id='thanh_pho'
                                        disabled
                                        onChange={(e) => handlethanh_pho(e)}
                                    >
                                        <option disabled selected value="">--Thành phố--</option>
                                        {
                                            thanh_pho.map((getcity, index) => (
                                                <option key={index} value={getcity.id} >{getcity.ten_thanh_pho} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-editnklt">
                                    <label className='label'>Quận</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="district"
                                        id='district'
                                        disabled
                                        onChange={(e) => handlequan(e)}
                                    >
                                        <option disabled selected value="">--Quận--</option>
                                        {
                                            quan.map((getdistrict, index) => (
                                                <option key={index} value={getdistrict.id}>{getdistrict.ten_quan} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-editnklt">
                                    <label className='label'>Phường</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="phuong_id"
                                        id='phuong_id'
                                        value={phuong_id || ""}
                                        disabled
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Phường--</option>
                                        {
                                            phuong.map((getward, index) => (
                                                <option key={index} value={getward.id}> {getward.ten_phuong} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-editnklt">
                                    <label className='label'>Thời gian đến</label>
                                    <input
                                        label="Arrival Time"
                                        type="text"
                                        // defaultValue="2017-05-24T10:30"
                                        // sx={{ width: 250 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        id='thoi_gian_den'
                                        name='thoi_gian_den'
                                        value={moment(thoi_gian_den).format('YYYY-MM-DD hh:mm:ss') || ""}
                                        placeholder="Chọn thời gian đến"
                                        disabled
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.thoi_gian_den}</p>
                                </div>


                                <div className="input-field-editnklt">
                                    <label className='label'>Thời gian rời đi</label>
                                    <input
                                        // label="Time To Leave"
                                        type="text"
                                        // defaultValue="2017-05-24T10:30"
                                        // sx={{ width: 250 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        id='thoi_gian_roi_di'
                                        name='thoi_gian_roi_di'
                                        value={moment(thoi_gian_roi_di).format('YYYY-MM-DD hh:mm:ss') || ""}
                                        placeholder="Chọn thời gian"
                                        disabled
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.thoi_gian_roi_di}</p>
                                </div>

                                <div className="input-field-editnklt">
                                    <label className='label'>Ghi chú</label>
                                    <input
                                        type="text"
                                        id='ghi_chu'
                                        name='ghi_chu'
                                        value={ghi_chu || ""}
                                        placeholder="Nhập ghi chú . . ."
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ghi_chu}</p>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-editnklt"></span>
                            <div className="fields-editnklt">
                                <div className="input-field-editnklt">
                                    <label className='label'>ID Lưu trú</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="luu_trus_id"
                                        id='luu_trus_id'
                                        value={luu_trus_id || ""}
                                        disabled
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--ID Lưu Trú--</option>
                                        {
                                            lt.map((getlt, index) => (
                                                <option key={index} value={getlt.id}>LT {getlt.id} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-editnklt">

                                </div>
                            </div>
                            <div className="buttons">

                                {/* <Link to="/nklt" className="backBtn"> */}
                                <div className="backBtn" onClick={handleBack} >
                                    <i className="uil uil-navigator"></i>
                                    <span className="btnText">Quay lại</span>
                                </div>
                                {/* </Link> */}
                                <button className="submit" type='submit'>
                                    <span className="btnText">Cập nhật</span>
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

export default EditNKLT