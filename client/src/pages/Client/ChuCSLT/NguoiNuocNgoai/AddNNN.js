import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddNNN.scss";
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
    // hinh: "",
    user_id: "",
    cslt_id: "",
    quoc_tich_id: "",
}

const AddNNN = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, ngay_sinh, gioi_tinh, email, so_ho_chieu, dia_chi, sdt, ngay_dang_ky, user_id, cslt_id, quoc_tich_id } = state;

    const [validationMsg, setValidationMsg] = useState({});

    const history = useHistory();

    const { id } = useParams();

    const [user, setUser] = useState([]);

    const [cslt, setCslt] = useState([]);

    const [quoctich, setQuoc_tich] = useState([]);

    const [useridmax, setUserIdMax] = useState([]);

    //user ID Max
    useEffect(() => {
        const getUserIM = async () => {
            const resuserim = await fetch("http://localhost:3000/usersidmax");
            const resuim = await resuserim.json();
            setUserIdMax(await resuim);
        }
        getUserIM();
    }, []);

    //User
    useEffect(() => {
        const getUser = async () => {
            const resuser = await fetch("http://localhost:3000/users");
            const resu = await resuser.json();
            setUser(await resu);
        }
        getUser();
    }, []);

    // //CSLT
    // useEffect(() => {
    //     const getCslt = async () => {
    //         const rescslt = await fetch(`http://localhost:3000/cslts/${id}`);
    //         const resc = await rescslt.json();
    //         setCslt(await resc);
    //     }
    //     getCslt();
    // }, []);

    //CSLT
    useEffect(() => {
        const getCslt = async () => {
            const response = JSON.parse(localStorage.getItem('cslt'));
            const id = response[0].id
            const rescslt = await fetch(`http://localhost:3000/cslts/${id}`);
            const resc = await rescslt.json();
            // localStorage.setItem("cslt", JSON.stringify(resc))
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

    //Nguoi_nuoc_ngoai
    useEffect(() => {
        axios
            .get(`http://localhost:3000/usersidmax`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);

    const validateAll = () => {
        const msg = {}

        let date = moment(Date()).format("YYYY");

        if ((date - (moment(ngay_sinh).format("YYYY"))) < 18) {
            msg.ngay_sinh = "Ngày sinh không hợp lệ!"
        }

        if (sdt.length != 10 || sdt[0] != 0) {
            msg.sdt = "Số điện thoại không tồn tại"
        }

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
            msg.email = "Email không đúng"
        }
        if (isEmpty(so_ho_chieu)) {
            msg.so_ho_chieu = "Vui lòng nhập số hộ chiếu"
        }
        if (isEmpty(dia_chi)) {
            msg.dia_chi = "Vui lòng nhập địa chỉ"
        }
        if (isEmpty(sdt)) {
            msg.sdt = "Vui lòng nhập số điện thoại"
        }
        if (isEmpty(ngay_dang_ky)) {
            msg.ngay_dang_ky = "Vui lòng chọn ngày khai báo"
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
        if (!ho_ten || !ngay_sinh || !gioi_tinh || !email || !so_ho_chieu || !dia_chi || !sdt || !ngay_dang_ky) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
                axios
                    .post("http://localhost:3000/nguoinuocngoais", {
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
                        cslt_id,
                        quoc_tich_id
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
                            cslt_id: "",
                            quoc_tich_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Thêm thành công!")
            }
            setTimeout(() => history.goBack(), 100);
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
            <div className="container-addnnn">
                <header className='header'>Thêm Người Nước Ngoài</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-addnnn first-addnnn">
                        <div className="details personal">
                            <span className="title-addnnn">Thông tin người nước ngoài</span>

                            <div className="fields-addnnn">
                                <div className="input-field-addnnn">
                                    <label className='label'>Xác nhận tên đăng ký</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="ho_ten"
                                        id='ho_ten'
                                        value={ho_ten || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Tên đăng ký--</option>
                                        {
                                            useridmax.map((getus, index) => (
                                                <option key={index}>{getus.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addnnn">
                                    <label className='label'>Ngày sinh</label>
                                    <input
                                        type="date"
                                        id='ngay_sinh'
                                        name='ngay_sinh'
                                        value={ngay_sinh || ""}
                                        placeholder="Chọn ngày sinh"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_sinh}</p>

                                </div>

                                <div className="input-field-addnnn">
                                    <label className='label'>Giới Tính</label>
                                    <select
                                        type="select"
                                        id='gioi_tinh'
                                        name='gioi_tinh'
                                        value={gioi_tinh || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""} > --Chọn Giới Tính--</option>
                                        <option>Nam</option>
                                        <option>Nữ</option>
                                        <option>Khác</option>
                                    </select>
                                </div>

                                <div className="input-field-addnnn">
                                    <label className='label'>Xác nhận Email</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="email"
                                        id='email'
                                        value={email || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Email--</option>
                                        {
                                            useridmax.map((getus, index) => (
                                                <option key={index}>{getus.email} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addnnn">
                                    <label className='label'>Số Hộ Chiếu</label>
                                    <input
                                        type="text"
                                        id='so_ho_chieu'
                                        name='so_ho_chieu'
                                        value={so_ho_chieu || ""}
                                        placeholder="Nhập Số Hộ Chiếu . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.so_ho_chieu}</p>
                                </div>

                                <div className="input-field-addnnn">
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

                                <div className="input-field-addnnn">
                                    <label className='label'>Quốc Tịch</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="quoc_tich_id"
                                        id='quoc_tich_id'
                                        value={quoc_tich_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Chọn Quốc Tịch--</option>
                                        {
                                            quoctich.map((getqt, index) => (
                                                <option key={index} value={getqt.id}> {getqt.ten_quoc_tich} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addnnn">
                                    <label className='label'>Xác nhận Số điện thoại</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="sdt"
                                        id='sdt'
                                        value={sdt || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Số điện thoại--</option>
                                        {
                                            useridmax.map((getus, index) => (
                                                <option key={index}>{getus.sdt} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addnnn">
                                    <label className='label'>Ngày Đăng Ký</label>
                                    <input
                                        type="date"
                                        id='ngay_dang_ky'
                                        name='ngay_dang_ky'
                                        value={ngay_dang_ky || ""}
                                        placeholder="Chọn Ngày Đăng Ký"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_dang_ky}</p>

                                </div>

                                <div className="input-field-addnnn">
                                    <label className='label'>Cơ Sở Lưu Trú</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="cslt_id"
                                        id='cslt_id'
                                        value={cslt_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Tên Cơ Sở Lưu Trú--</option>
                                        {
                                            cslt.map((getcslt, index) => (
                                                <option key={index} value={getcslt.id}>{getcslt.ten_cslt} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="input-field-addnnn">
                                    <label className='label'>Tài Khoản</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="user_id"
                                        id='user_id'
                                        value={user_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Tài Khoản Người Nước Ngoài--</option>
                                        {
                                            useridmax.map((getus, index) => (
                                                <option key={index} value={getus.id}>{getus.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-addnnn"></span>

                            <div className="fields-addnnn">


                            </div>
                            <div className="buttons">
                                {/* <Link to="/nnn" className="backBtn"> */}
                                <div className="backBtn" onClick={handleBack} >
                                    <i className="uil uil-navigator"></i>
                                    <span className="btnText">Quay Lại</span>
                                </div>
                                {/* </Link> */}
                                <button className="submit" type='submit'>
                                    <span className="btnText">Thêm</span>
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

export default AddNNN