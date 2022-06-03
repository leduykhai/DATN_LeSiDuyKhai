import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddLT.scss";
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

const AddLT = () => {
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
            .get(`http://localhost:3000/tintucs/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);


    const validateAll = () => {
        const msg = {}

        if (isEmpty(ten_phong)) {
            msg.ten_phong = "Please input your Title"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ten_phong) {
            toast.error("please provide value into each input field");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                axios
                    .post("http://localhost:3000/luutrus", {
                        ngay_dang_ky_lt,
                        ngay_den_lt,
                        ten_phong,
                        ngay_di_du_kien,
                        ngay_di_thuc,
                        nnn_id,
                        cslt_id,
                        luutru_status_id
                    })
                    .then(() => {
                        setState({
                            ngay_dang_ky_lt: "",
                            ngay_den_lt: "",
                            ten_phong: "",
                            ngay_di_du_kien: "",
                            ngay_di_thuc: "",
                            nnn_id: "",
                            cslt_id: "",
                            luutru_status_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Stay Added Successfully")
            }
            setTimeout(() => history.push("/lt"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-addlt">
                <header className='header'>Registration</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-addlt first-addlt">
                        <div className="details personal">
                            <span className="title-addlt">News Details</span>

                            <div className="fields-addlt">
                                <div className="input-field-addlt">
                                    <label className='label'>Registration Date</label>
                                    <input
                                        type="date"
                                        id='ngay_dang_ky_lt'
                                        name='ngay_dang_ky_lt'
                                        value={ngay_dang_ky_lt || ""}
                                        placeholder="Enter Registration Date"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_dang_ky_lt}</p>
                                </div>

                                <div className="input-field-addlt">
                                    <label className='label'>Arrival Date</label>
                                    <input
                                        type="date"
                                        id='ngay_den_lt'
                                        name='ngay_den_lt'
                                        value={ngay_den_lt || ""}
                                        placeholder="Enter Arrival Date"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_den_lt}</p>
                                </div>

                                <div className="input-field-addlt">
                                    <label className='label'>Room Name</label>
                                    <input
                                        type="text"
                                        id='ten_phong'
                                        name='ten_phong'
                                        value={ten_phong || ""}
                                        placeholder="Enter Room Name"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ten_phong}</p>
                                </div>

                                <div className="input-field-addlt">
                                    <label className='label'>Estimated Travel Date</label>
                                    <input
                                        type="date"
                                        id='ngay_di_du_kien'
                                        name='ngay_di_du_kien'
                                        value={ngay_di_du_kien || ""}
                                        placeholder="Enter Estimated Travel Date"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_di_du_kien}</p>
                                </div>

                                <div className="input-field-addlt">
                                    <label className='label'>Status</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="luutru_status_id"
                                        id='luutru_status_id'
                                        value={luutru_status_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Select Status --</option>
                                        {
                                            ltstt.map((getstt, index) => (
                                                <option key={index} value={getstt.id}>{getstt.status_name} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                {/* <div className="input-field-addlt">
                                    <label className='label'>Actual Travel Date</label>
                                    <input
                                        type="date"
                                        id='ngay_di_thuc'
                                        name='ngay_di_thuc'
                                        value={ngay_di_thuc || ""}
                                        disabled
                                        placeholder="Enter Actual Travel Date"
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_di_thuc}</p>
                                </div> */}
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-addlt">Identity Details</span>
                            <div className="fields-addlt">
                                <div className="input-field-addlt">
                                    <label className='label'>Foreigner ID</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="nnn_id"
                                        id='nnn_id'
                                        value={nnn_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Select Foreigner ID--</option>
                                        {
                                            nnn.map((getnnn, index) => (
                                                <option key={index} value={getnnn.id}>NNN {getnnn.id} - {getnnn.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="input-field-addlt">
                                    <label className='label'>Accommodation Facility ID</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="cslt_id"
                                        id='cslt_id'
                                        value={cslt_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Select Accommodation ID--</option>
                                        {
                                            cslt.map((getcslt, index) => (
                                                <option key={index} value={getcslt.id}>CSLT {getcslt.id} - {getcslt.ten_cslt} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="input-field-addlt">

                                </div>
                            </div>
                            <div className="buttons">

                                <Link to="/lt" className="backBtn">
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

export default AddLT