import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./EditLT.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const initialState = {
    ngay_dang_ky_lt: "",
    ngay_den_lt: "",
    ten_phong: "",
    ngay_di_du_kien: "",
    ngay_di_thuc: "",
    nnn_id: "",
    cslt_id: "",
    luutru_status_id: ""
}

const EditLT = () => {
    const [state, setState] = useState(initialState);

    const { ngay_dang_ky_lt, ngay_den_lt, ten_phong, ngay_di_du_kien, ngay_di_thuc, nnn_id, cslt_id, luutru_status_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [nnn, setNnn] = useState([]);

    const [cslt, setCslt] = useState([]);

    const [ltstt, setLtstt] = useState([]);

    //nguoi nuoc ngoai
    useEffect(() => {
        const getNNN = async () => {
            const resnnn = await fetch("http://localhost:3000/nguoinuocngoais");
            const resn = await resnnn.json();
            setNnn(await resn);
        }
        getNNN();
    }, []);

    //co so luu tru
    useEffect(() => {
        const getcslt = async () => {
            const rescslt = await fetch("http://localhost:3000/cslts");
            const resc = await rescslt.json();
            setCslt(await resc);
        }
        getcslt();
    }, []);

    //luu tru stt
    useEffect(() => {
        const getLTS = async () => {
            const reslts = await fetch("http://localhost:3000/ltstatus");
            const ress = await reslts.json();
            setLtstt(await ress);
        }
        getLTS();
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/luutrus/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);


    const validateAll = () => {
        const msg = {}

        if (isEmpty(ten_phong)) {
            msg.ten_phong = "Vui l??ng nh???p t??n ph??ng"
        }
        let date = moment().format("YYYY-MM-DD");
        // console.log(date)


        if (ngay_dang_ky_lt > ngay_den_lt) {
            msg.ngay_dang_ky_lt = "Ng??y ????ng k?? ph???i nh??? h??n ho???c b???ng ng??y ?????n"
        }

        if (ngay_di_du_kien < ngay_den_lt) {
            msg.ngay_di_du_kien = "Ng??y ??i d??? ki???n ph???i l???n h??n ho???c b???ng ng??y hi???n t???i"
        }

        if (ngay_di_thuc !== date) {
            msg.ngay_di_thuc = "Ng??y ??i th???c ph???i l?? ng??y hi???n t???i"
        }


        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!ten_phong) {
            toast.error("Vui l??ng nh???p ?????y ????? th??ng tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
                var ngay_di_thuc = moment(ngay_di_thuc).format('YYYY-MM-DD hh:mm:ss')
                axios
                    .put("http://localhost:3000/luutrus", {
                        id,
                        ten_phong,
                        ngay_di_thuc,
                        luutru_status_id
                    })
                    .then(() => {
                        setState({
                            ten_phong: "",
                            ngay_di_thuc: "",
                            luutru_status_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("C???p nh???t th??nh c??ng!")
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
            <div className="container-editlt">
                <header className='header'>C???p nh???t th??ng tin l??u tr??</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-editlt first-editlt">
                        <div className="details personal">
                            <span className="title-editlt">Th??ng tin ng?????i n?????c ngo??i ??i</span>

                            <div className="fields-editlt">
                                <div className="input-field-editlt">
                                    <label className='label'>Ng??y ????ng k?? l??u tr??</label>
                                    <input
                                        type="date"
                                        id='ngay_dang_ky_lt'
                                        name='ngay_dang_ky_lt'
                                        value={moment(ngay_dang_ky_lt).format('YYYY-MM-DD') || ""}
                                        placeholder="Ch???n ng??y"
                                        disabled
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_dang_ky_lt}</p>
                                </div>

                                <div className="input-field-editlt">
                                    <label className='label'>Ng??y ?????n l??u tr??</label>
                                    <input
                                        type="date"
                                        id='ngay_den_lt'
                                        name='ngay_den_lt'
                                        value={moment(ngay_den_lt).format('YYYY-MM-DD') || ""}
                                        placeholder="Ch???n ng??y"
                                        disabled
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_den_lt}</p>
                                </div>

                                <div className="input-field-editlt">
                                    <label className='label'>T??n ph??ng</label>
                                    <input
                                        type="text"
                                        id='ten_phong'
                                        name='ten_phong'
                                        value={ten_phong || ""}
                                        placeholder="Nh???p t??n ph??ng . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ten_phong}</p>
                                </div>

                                <div className="input-field-editlt">
                                    <label className='label'>Ng??y ??i d??? ki???n</label>
                                    <input
                                        type="date"
                                        id='ngay_di_du_kien'
                                        name='ngay_di_du_kien'
                                        value={moment(ngay_di_du_kien).format('YYYY-MM-DD') || ""}
                                        disabled
                                        placeholder="Ch???n ng??y ??i"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_di_du_kien}</p>
                                </div>

                                <div className="input-field-editlt">
                                    <label className='label'>Ng??y ??i th???c t???</label>
                                    <input
                                        type="date"
                                        id='ngay_di_thuc'
                                        name='ngay_di_thuc'
                                        value={moment(ngay_di_thuc).format('YYYY-MM-DD') || ""}
                                        placeholder="Ch???n ng??y"
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_di_thuc}</p>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-editlt"></span>
                            <div className="fields-editlt">
                                <div className="input-field-editlt">
                                    <label className='label'>Ng?????i n?????c ngo??i</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="nnn_id"
                                        id='nnn_id'
                                        value={nnn_id || ""}
                                        disabled
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Ng?????i n?????c ngo??i--</option>
                                        {
                                            nnn.map((getnnn, index) => (
                                                <option key={index} value={getnnn.id}>NNN {getnnn.id} - {getnnn.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="input-field-editlt">
                                    <label className='label'>C?? s??? l??u tr??</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="cslt_id"
                                        id='cslt_id'
                                        value={cslt_id || ""}
                                        disabled
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--C?? s??? l??u tr??--</option>
                                        {
                                            cslt.map((getcslt, index) => (
                                                <option key={index} value={getcslt.id}>CSLT {getcslt.id} - {getcslt.ten_cslt} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="input-field-editlt">
                                    <label className='label'>Tr???ng th??i</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="luutru_status_id"
                                        id='luutru_status_id'
                                        value={luutru_status_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Tr???ng th??i--</option>
                                        {
                                            ltstt.map((getstt, index) => (
                                                <option key={index} value={getstt.id}>{getstt.status_name} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="buttons">

                                {/* <Link to="/lt" className="backBtn"> */}
                                <div className="backBtn" onClick={handleBack} >
                                    <i className="uil uil-navigator"></i>
                                    <span className="btnText">quay l???i</span>
                                </div>
                                {/* </Link> */}
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

export default EditLT