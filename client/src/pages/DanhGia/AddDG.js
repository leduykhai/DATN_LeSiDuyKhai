import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddDG.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const initialState = {
    cslt_id: "",
    nnn_id: "",
    noi_dung: ""
}

const AddDG = () => {
    const [state, setState] = useState(initialState);

    const { cslt_id, nnn_id, noi_dung } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [nnn, setNnn] = useState([]);

    const [cslt, setCslt] = useState([]);

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

    useEffect(() => {
        axios
            .get(`http://localhost:3000/danhgias/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);


    const validateAll = () => {
        const msg = {}

        if (isEmpty(noi_dung)) {
            msg.noi_dung = "Vui lòng nhập nội dung"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!noi_dung) {
            toast.error("Vui lòng nhập đầy đủ thôn tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                axios
                    .post("http://localhost:3000/danhgias", {
                        cslt_id,
                        nnn_id,
                        noi_dung
                    })
                    .then(() => {
                        setState({
                            cslt_id: "",
                            nnn_id: "",
                            noi_dung: "",
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Thêm thành công!")
            }
            setTimeout(() => history.push("/dg"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-adddg">
                <header className='header'>Thêm đánh giá</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-adddg first-adddg">
                        <div className="details personal">
                            <span className="title-adddg">thông tin đánh giá</span>

                            <div className="fields-adddg">
                                <div className="input-field-adddg">
                                    <label className='label'>Nội dung</label>
                                    <input
                                        className='input-content'
                                        type="text"
                                        id='noi_dung'
                                        name='noi_dung'
                                        value={noi_dung || ""}
                                        placeholder="Nhập đánh giá..."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.noi_dung}</p>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-adddg"></span>
                            <div className="fields-adddg">
                                <div className="input-field-adddg">
                                    <label className='label'>Người đánh giá</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="nnn_id"
                                        id='nnn_id'
                                        value={nnn_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Người nước ngoài--</option>
                                        {
                                            nnn.map((getnnn, index) => (
                                                <option key={index} value={getnnn.id}>NNN {getnnn.id} - {getnnn.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="input-field-adddg">
                                    <label className='label'>Cơ sở lưu trú</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="cslt_id"
                                        id='cslt_id'
                                        value={cslt_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Cơ sở lưu trú--</option>
                                        {
                                            cslt.map((getcslt, index) => (
                                                <option key={index} value={getcslt.id}>CSLT {getcslt.id} - {getcslt.ten_cslt} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="input-field-adddg">

                                </div>
                            </div>
                            <div className="buttons">

                                <Link to="/dg" className="backBtn">
                                    <div className="backBtn" >
                                        <i className="uil uil-navigator"></i>
                                        <span className="btnText">Quay lại</span>
                                    </div>
                                </Link>
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

export default AddDG