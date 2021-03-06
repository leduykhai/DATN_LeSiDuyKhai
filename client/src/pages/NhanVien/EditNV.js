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

        let year = moment(Date()).format("YYYY");
        // console.log(date)

        if ((year - (moment(ngay_sinh).format("YYYY"))) < 18) {
            msg.ngay_sinh = "Tu???i kh??ng h???p l???!"
        }

        if (isEmpty(ho_ten)) {
            msg.ho_ten = "Vui l??ng nh???p h??? t??n"
        }
        if (isEmpty(ngay_sinh)) {
            msg.ngay_sinh = "Vui l??ng ch???n ng??y sinh"
        }
        if (isEmpty(gioi_tinh)) {
            msg.gioi_tinh = "Vui l??ng ch???n gi???i t??nh"
        }
        if (isEmpty(email)) {
            msg.email = "Vui l??ng nh???p email"
        } else if (!isEmail(email)) {
            msg.email = "email kh??ng ????ng"
        }
        if (isEmpty(cccd)) {
            msg.cccd = "vui l??ng nh???p c??n c?????c c??ng d??n"
        }
        if (isEmpty(dia_chi)) {
            msg.dia_chi = "Vui l??ng nh???p ?????a ch???"
        }
        if (isEmpty(sdt)) {
            msg.sdt = "vui l??ng nh???p s??? ??i???n tho???i"
        }
        if (isEmpty(chuc_vu)) {
            msg.chuc_vu = "Vui l??ng ch???n ch???c v???"
        }
        // if (isEmpty(hinh)) {
        //     msg.hinh = "Please input your Images"
        // }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const ns = moment(ngay_sinh).format('YYYY-MM-DD')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ho_ten || !gioi_tinh || !email || !cccd || !dia_chi || !sdt || !chuc_vu) {
            toast.error("Vui l??ng nh???p ?????y ????? th??ng tin");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
                var ngay_sinh = ns;
                axios
                    .put("http://localhost:3000/nhanviens", {
                        id,
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
                toast.success("C???p nh???t th??nh c??ng")
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
                <header className='header'>C???p nh???t</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-editnv first-editnv">
                        <div className="details personal">
                            <span className="title-editnv">Th??ng tin c?? nh??n</span>

                            <div className="fields-editnv">
                                <div className="input-field-editnv">
                                    <label className='label'>H??? t??n</label>
                                    <input
                                        type="text"
                                        id='ho_ten'
                                        name='ho_ten'
                                        value={ho_ten || ""}
                                        placeholder="Nh???p h??? t??n . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Ng??y sinh</label>
                                    <input
                                        type="date"
                                        id='ngay_sinh'
                                        name='ngay_sinh'
                                        value={moment(ngay_sinh).format('YYYY-MM-DD') || ""}
                                        placeholder="Ch???n ng??y sinh"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_sinh}</p>

                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Gi???i t??nh</label>
                                    <select
                                        type="select"
                                        id='gioi_tinh'
                                        name='gioi_tinh'
                                        value={gioi_tinh || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""} >--Ch???n Gi???i T??nh--</option>
                                        <option>Nam</option>
                                        <option>N???</option>
                                        <option>Kh??c</option>
                                    </select>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Email</label>
                                    <input
                                        type="email"
                                        id='email'
                                        name='email'
                                        value={email || ""}
                                        placeholder="Nh???p email . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.email}</p>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>C??n C?????c c??ng d??n</label>
                                    <input
                                        type="number"
                                        id='cccd'
                                        name='cccd'
                                        value={cccd || ""}
                                        placeholder="Nh???p CCCD . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.cccd}</p>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>?????a Ch???</label>
                                    <input
                                        type="text"
                                        id='dia_chi'
                                        name='dia_chi'
                                        value={dia_chi || ""}
                                        placeholder="Nh???p ?????a Ch??? . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.dia_chi}</p>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Th??nh Ph???</label>
                                    <select name="thanh_pho" className="form-control p-2" onChange={(e) => handlethanh_pho(e)} >
                                        <option disabled selected value="">--Ch???n Th??nh Ph???--</option>
                                        {
                                            thanh_pho.map((getcity, index) => (
                                                <option key={index} value={getcity.id} >{getcity.ten_thanh_pho} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Qu???n</label>
                                    <select
                                        className="form-select"
                                        name="state"
                                        onChange={(e) => handlequan(e)}
                                    >
                                        <option disabled selected value="">--Ch???n Qu???n--</option>
                                        {
                                            quan.map((getdistrict, index) => (
                                                <option key={index} value={getdistrict.id}>{getdistrict.ten_quan} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Ph?????ng</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="phuong_id"
                                        id='phuong_id'
                                        value={phuong_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Ch???n Ph?????ng--</option>
                                        {
                                            phuong.map((getward, index) => (
                                                <option key={index} value={getward.id}> {getward.ten_phuong} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>S??? ??i???n Tho???i</label>
                                    <input
                                        type="number"
                                        id='sdt'
                                        name='sdt'
                                        value={sdt || ""}
                                        placeholder="Nh???p S??? ??i???n tho???i"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Ch???c v???</label>
                                    <select
                                        type="select"
                                        id='chuc_vu'
                                        name='chuc_vu'
                                        value={chuc_vu || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        {/* <option disabled selected>--Select gender--</option> */}
                                        <option disabled selected value={""}>--Ch???n Ch???c V???--</option>
                                        <option>Nh??n Vi??n</option>
                                    </select>
                                </div>

                                <div className="input-field-editnv">
                                    <label className='label'>Khu V???c Qu???n L??</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="khuvuc_id"
                                        id='khuvuc_id'
                                        value={khuvuc_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Ch???n khu v???c--</option>
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
                                    <label className='label'>ID t??i Kho???n</label>
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
                                        <span className="btnText">Quay l???i</span>
                                    </div>
                                </Link>
                                <button className="submit" type='submit'>
                                    <span className="btnText">C???p nh???t</span>
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