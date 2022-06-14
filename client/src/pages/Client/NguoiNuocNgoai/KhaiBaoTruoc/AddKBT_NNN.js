import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddKBT_NNN.scss";
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

const AddKBT_Client = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, ngay_sinh, gioi_tinh, email, so_ho_chieu, dia_chi, sdt, ngay_dang_ky, ngay_den_luu_tru, cslt_id, quoc_tich_id, kbt_status_id } = state;

    const [validationMsg, setValidationMsg] = useState({});

    const history = useHistory();

    const { id } = useParams();

    const [cslt, setCslt] = useState([]);

    const [quoctich, setQuoc_tich] = useState([]);

    const [kbt, setKbt] = useState([]);

    const [nnn, setNnn] = useState([]);

    const response = JSON.parse(localStorage.getItem('user'));

    const id_nnn = response[0].id;

    //Nguoi Nuoc Ngoai
    useEffect(() => {
        const getNnn = async () => {
            const resnnn = await fetch(`http://localhost:3000/nguoinuocngoaisuser/${id_nnn}`);
            const resn = await resnnn.json();
            setNnn(await resn);
        }
        getNnn();
    }, []);

    //CSLT
    useEffect(() => {
        const getCslt = async () => {
            const rescslt = await fetch(`http://localhost:3000/cslts/${id}`);
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
    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:3000/khaibaotruocs/${id}`)
    //         .then((resp) => setState({ ...resp.data[0] }));
    // }, [id]);

    const validateAll = () => {
        const msg = {}

        // for (var key in user) {
        //     if (user[key].email == email) {
        //         msg.email = "Email Đã Được Sử Dụng!"
        //     }
        // }

        // console.log(sdt[0]) //bắt đầu bằng số 0

        if (sdt.length != 10 || sdt[0] != 0) {
            msg.sdt = "Số điện thoại không tồn tại!"
        }

        // var PhoneNumber;
        // for (var i = 0; i < user.length; i++) {
        //     PhoneNumber = user[i].sdt;
        //     if (PhoneNumber == sdt) {
        //         msg.sdt = "Số điện thoại đã được sử dụng!"
        //     }
        // }

        let date = moment(Date()).format("YYYY-MM-DD");
        let year = moment(Date()).format("YYYY");
        // console.log(date)

        if ((year - (moment(ngay_sinh).format("YYYY"))) < 18) {
            msg.ngay_sinh = "Tuổi không hợp lệ!"
        }

        if (so_ho_chieu.length < 3) {
            msg.so_ho_chieu = "Số hộ chiếu không tồn tại!"
        }

        if (ngay_den_luu_tru < date) {
            msg.ngay_den_luu_tru = "Ngày đến lưu trú phải bằng hoặc lớn hơn ngày hiện tại!"
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
        // if (isEmpty(ngay_dang_ky)) {
        //     msg.ngay_dang_ky = "Vui lòng chọn ngày khai báo"
        // }
        if (isEmpty(ngay_den_luu_tru)) {
            msg.ngay_den_luu_tru = "Vui lòng chọn ngày đến lưu trú"
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
            toast.error("Vui lòng nhập đầy đủ thông tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
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
                        // kbt_status_id
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
                            // kbt_status_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Khai Báo Thành Công, Vui lòng đến lưu trú đúng ngày!")
            }
            setTimeout(() => history.push("/client"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-addkbt">
                <header className='header'>Khai Báo Thông Tin Lưu Trú</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-addkbt first-addkbt">
                        <div className="details personal">
                            <span className="title-addkbt">Thông tin khai báo</span>

                            <div className="fields-addkbt">
                                <div className="input-field-addkbt">
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
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div>

                                <div className="input-field-addkbt">
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

                                <div className="input-field-addkbt">
                                    <label className='label'>Xác nhận giới tính</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="gioi_tinh"
                                        id='gioi_tinh'
                                        value={gioi_tinh || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Giới tính--</option>
                                        {
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.gioi_tinh} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.gioi_tinh}</p>
                                </div>

                                <div className="input-field-addkbt">
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
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.email} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.email}</p>
                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>Xác nhận Số Hộ Chiếu</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="so_ho_chieu"
                                        id='so_ho_chieu'
                                        value={so_ho_chieu || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Số Hộ Chiếu--</option>
                                        {
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.so_ho_chieu} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.so_ho_chieu}</p>
                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>Xác nhận số điện thoại</label>
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
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.sdt} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>Xác nhận Địa chỉ</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="dia_chi"
                                        id='dia_chi'
                                        value={dia_chi || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Địa Chỉ--</option>
                                        {
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.dia_chi} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.dia_chi}</p>
                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>Xác nhận ID Quốc Tịch</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="quoc_tich_id"
                                        id='quoc_tich_id'
                                        value={quoc_tich_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Quốc Tịch--</option>
                                        {
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.quoc_tich_id} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.quoc_tich_id}</p>
                                </div>

                                {/* <div className="input-field-addkbt">
                                    <label className='label'>Ngày Khai Báo</label>
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

                                </div> */}

                                <div className="input-field-addkbt">

                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>Ngày Đến Lưu Trú</label>
                                    <input
                                        type="datetime-local"
                                        id='ngay_den_luu_tru'
                                        name='ngay_den_luu_tru'
                                        value={ngay_den_luu_tru || ""}
                                        placeholder="Chọn Ngày Đến Lưu Trú"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_den_luu_tru}</p>

                                </div>

                                <div className="input-field-addkbt">
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

                                <div className="input-field-addkbt">

                                </div>

                                {/* <div className="input-field-addkbt">
                                    <label className='label'>Trạng Thái</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="kbt_status_id"
                                        id='kbt_status_id'
                                        value={kbt_status_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Trạng Thái--</option>
                                        {
                                            kbt.map((getkbt, index) => (
                                                <option key={index} value={getkbt.id}>{getkbt.status_name} </option>
                                            ))
                                        }
                                    </select>
                                </div> */}



                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-addkbt"></span>

                            <div className="fields-addkbt">

                            </div>
                            <div className="buttons">
                                <Link to="/client" className="backBtn">
                                    <div className="backBtn" >
                                        <i className="uil uil-navigator"></i>
                                        <span className="btnText">Quay lại</span>
                                    </div>
                                </Link>
                                <button className="submit" type='submit'>
                                    <span className="btnText">Gửi</span>
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

export default AddKBT_Client