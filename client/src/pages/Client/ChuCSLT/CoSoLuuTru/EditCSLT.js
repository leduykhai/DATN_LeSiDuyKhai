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
            msg.ten_cslt = "Vui l??ng nh???p T??n cslt"
        }
        if (isEmpty(loai_cslt)) {
            msg.loai_cslt = "Vui l??ng Lo???i cslt"
        }
        if (isEmpty(nguoi_dai_dien)) {
            msg.nguoi_dai_dien = "Vui l??ng nh???p t??n ng?????i ?????i di???n"
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
            toast.error("Vui l??ng nh???p ?????y ????? th??ng tin");
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
                toast.success("C???p nh???t th??nh c??ng!")
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
                <header className='header'>C???p nh???t</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-editcslt first-editcslt">
                        <div className="details personal">
                            <span className="title-editcslt">Th??ng Tin C?? S??? L??u Tr??</span>

                            <div className="fields-editcslt">
                                <div className="input-field-editcslt">
                                    <label className='label'>T??n C?? S??? L??u Tr??</label>
                                    <input
                                        type="text"
                                        id='ten_cslt'
                                        name='ten_cslt'
                                        value={ten_cslt || ""}
                                        placeholder="Nh???p T??n CSLT . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ten_cslt}</p>
                                </div>

                                <div className="input-field-editcslt">
                                    <label className='label'>Lo???i C?? S??? L??u Tr??</label>
                                    <select
                                        type="select"
                                        id='loai_cslt'
                                        name='loai_cslt'
                                        value={loai_cslt || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""}>--Ch???n Lo???i CSLT--</option>
                                        {/* <option>--Select gender--</option> */}
                                        <option>CC - Chung c??, c?? s??? y t???, k?? t??c x??</option>
                                        <option>KCN - Khu c??ng nghi???p, ch??? xu???t</option>
                                        <option>KS - Kh??ch s???n, nh?? tr???</option>
                                        <option>NDKD - Nh?? d??n kinh doanh</option>
                                        <option>VL - Nh?? d??n kh??ng kinh doanh</option>
                                    </select>
                                </div>

                                <div className="input-field-editcslt">
                                    <label className='label'>Ng?????i ?????i Di???n</label>
                                    <input
                                        type="text"
                                        id='nguoi_dai_dien'
                                        name='nguoi_dai_dien'
                                        value={nguoi_dai_dien || ""}
                                        placeholder="Nh???p T??n Ng?????i ?????i Di???n . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.nguoi_dai_dien}</p>
                                </div>

                                <div className="input-field-editcslt">
                                    <label className='label'>S??? ??i???n Tho???i</label>
                                    <input
                                        type="number"
                                        id='sdt'
                                        name='sdt'
                                        value={sdt || ""}
                                        placeholder="Nh???p S??? ??i???n Tho???i . . ."
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
                                        placeholder="Nh???p email . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.email}</p>
                                </div>

                                <div className="input-field-editcslt">
                                    <label className='label'>?????a Ch???</label>
                                    <input
                                        type="text"
                                        id='dia_chi'
                                        name='dia_chi'
                                        value={dia_chi || ""}
                                        placeholder="Nh???p ?????a Ch???"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.dia_chi}</p>
                                </div>

                                {/* <div className="input-field-editcslt">
                                    <label className='label'>Th??nh Ph???</label>
                                    <select
                                        className="form-control p-2"
                                        name="thanh_pho"
                                        id='thanh_pho'
                                        // required
                                        onChange={(e) => handlethanh_pho(e)}
                                    >
                                        <option disabled selected value="">--Ch???n Th??nh Ph???--</option>
                                        {
                                            thanh_pho.map((getcity, index) => (
                                                <option key={index} value={getcity.id} >{getcity.ten_thanh_pho} </option>
                                            ))
                                        }
                                    </select>
                                </div> */}

                                <div className="input-field-editcslt">
                                    <label className='label'>Qu???n</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="district"
                                        id='district'
                                        // required
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

                                <div className="input-field-editcslt">
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
                                <div className="input-field-editcslt">

                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-editcslt"></span>

                            <div className="fields-editcslt">
                                <div className="input-field-editcslt">
                                    <label className='label'>T??i Kho???n</label>
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
                                        <option disabled selected value="">--T??n T??i Kho???n--</option>
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
                                    <span className="btnText">Quay L???i</span>
                                </div>
                                {/* </Link> */}
                                <button className="submit" type='submit'>
                                    <span className="btnText">C???p Nh???t</span>
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