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
    cccd: "",
    dia_chi: "",
    sdt: "",
    chuc_vu: "",
    // hinh: "",
    user_id: "",
    phuong_id: "",
    khuvuc_id: ""
}

const EditNV = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, ngay_sinh, gioi_tinh, email, cccd, dia_chi, sdt, chuc_vu, user_id, phuong_id, khuvuc_id } = state;

    const [validationMsg, setValidationMsg] = useState({});

    const history = useHistory();

    const { id } = useParams();

    const [thanh_pho, setThanh_pho] = useState([]);
    const [thanh_pho_id, setThanh_pho_id] = useState('');
    const [quan, setQuan] = useState([]);
    const [quan_id, setQuan_id] = useState('');
    const [phuong, setPhuong] = useState([]);

    const [khu_vuc, setKhu_vuc] = useState([]);

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
        axios
            .get(`http://localhost:3000/nhanviens/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);

    const validateAll = () => {
        const msg = {}

        if (isEmpty(ho_ten)) {
            msg.ho_ten = "Vui lòng nhập họ tên"
        }
        if (isEmpty(ngay_sinh)) {
            msg.ngay_sinh = "Vui lòng chọn ngày sinh"
        }
        if (isEmpty(gioi_tinh)) {
            msg.gioi_tinh = "Vui lòng chọn giới tính"
        }
        if (isEmpty(email)) {
            msg.email = "Vui lòng nhập email"
        } else if (!isEmail(email)) {
            msg.email = "email không đúng"
        }
        if (isEmpty(cccd)) {
            msg.cccd = "vui lòng nhập căn cước công dân"
        }
        if (isEmpty(dia_chi)) {
            msg.dia_chi = "Vui lòng nhập địa chỉ"
        }
        if (isEmpty(sdt)) {
            msg.sdt = "vui lòng nhập số điện thoại"
        }
        if (isEmpty(chuc_vu)) {
            msg.chuc_vu = "Vui lòng chọn chức vụ"
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
        if (!ho_ten || !gioi_tinh || !email || !cccd || !dia_chi || !sdt || !chuc_vu) {
            toast.error("Vui lòng nhập đầy đủ");
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
                        // ngay_sinh,
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
                toast.success("Cập nhật thành công")
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
            <div className="container-editnv">
                <header className='header'>Cập nhật</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-editnv first-editnv">
                        <div className="details personal">
                            <span className="title-editnv">Thông tin cá nhân</span>

                            <div className="fields-editnv">
                                <div className="input-field-editnv">
                                    <label className='label'>Họ tên</label>
                                    <input
                                        type="text"
                                        id='ho_ten'
                                        name='ho_ten'
                                        value={ho_ten || ""}
                                        placeholder="Nhập họ tên . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Ngày sinh</label>
                                    <input
                                        type="date"
                                        id='ngay_sinh'
                                        name='ngay_sinh'
                                        value={moment(ngay_sinh).format('YYYY-MM-DD') || ""}
                                        placeholder="Chọn ngày sinh"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_sinh}</p>

                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Giới tính</label>
                                    <select
                                        type="select"
                                        id='gioi_tinh'
                                        name='gioi_tinh'
                                        value={gioi_tinh || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""} >--Chọn Giới Tính--</option>
                                        <option>Nam</option>
                                        <option>Nữ</option>
                                        <option>Khác</option>
                                    </select>
                                </div>

                                <div className="input-field-editnv">
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

                                <div className="input-field-editnv">
                                    <label className='label'>Căn Cước công dân</label>
                                    <input
                                        type="number"
                                        id='cccd'
                                        name='cccd'
                                        value={cccd || ""}
                                        placeholder="Nhập CCCD . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.cccd}</p>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Địa Chỉ</label>
                                    <input
                                        type="text"
                                        id='dia_chi'
                                        name='dia_chi'
                                        value={dia_chi || ""}
                                        placeholder="Nhập Địa Chỉ . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.dia_chi}</p>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Thành Phố</label>
                                    <select name="thanh_pho" className="form-control p-2" onChange={(e) => handlethanh_pho(e)} >
                                        <option disabled selected value="">--Chọn Thành Phố--</option>
                                        {
                                            thanh_pho.map((getcity, index) => (
                                                <option key={index} value={getcity.id} >{getcity.ten_thanh_pho} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Quận</label>
                                    <select
                                        className="form-select"
                                        name="state"
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

                                <div className="input-field-editnv">
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

                                <div className="input-field-editnv">
                                    <label className='label'>Số Điện Thoại</label>
                                    <input
                                        type="number"
                                        id='sdt'
                                        name='sdt'
                                        value={sdt || ""}
                                        placeholder="Nhập Số Điện thoại"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Chức vụ</label>
                                    <select
                                        type="select"
                                        id='chuc_vu'
                                        name='chuc_vu'
                                        value={chuc_vu || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        {/* <option disabled selected>--Select gender--</option> */}
                                        <option disabled selected value={""}>--Chọn Chức Vụ--</option>
                                        <option>Nhân Viên</option>
                                    </select>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Khu Vực Quản Lý</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="khuvuc_id"
                                        id='khuvuc_id'
                                        value={khuvuc_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Chọn khu vực--</option>
                                        {
                                            khu_vuc.map((getkv, index) => (
                                                <option key={index} value={getkv.id}>{getkv.ten_khu_vuc} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                {/* <div className="input-field-editnv">
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
                            <span className="title-editnv"></span>

                            <div className="fields-editnv">
                                <div className="input-field-editnv">
                                    <label className='label'>ID tài Khoản</label>
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
                            </div>
                            <div className="buttons">
                                <Link to="/nhanvien" className="backBtn">
                                    <div className="backBtn" >
                                        <i className="uil uil-navigator"></i>
                                        <span className="btnText">Quay lại</span>
                                    </div>
                                </Link>
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

export default EditNV