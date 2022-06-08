import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddTT.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const initialState = {
    tieu_de: "",
    noi_dung: "",
    ngay_tao: "",
    // file: "",
    nhanvien_id: ""
}

const AddTT = () => {
    const [state, setState] = useState(initialState);

    const { tieu_de, noi_dung, ngay_tao, nhanvien_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [nhanvien, setNhanvien] = useState([]);

    useEffect(() => {
        const getNV = async () => {
            const resnhanvien = await fetch("http://localhost:3000/nhanviens");
            const resnv = await resnhanvien.json();
            setNhanvien(await resnv);
        }
        getNV();
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/tintucs/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);


    const validateAll = () => {
        const msg = {}

        if (isEmpty(tieu_de)) {
            msg.tieu_de = "Vui lòng nhập tiêu đề"
        }
        if (isEmpty(noi_dung)) {
            msg.noi_dung = "Vui lòng nhập nội dung"
        }
        if (isEmpty(ngay_tao)) {
            msg.ngay_tao = "Vui chọn ngày"
        }
        // if (isEmpty(file)) {
        //     msg.file = "Please input your file"
        // }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tieu_de || !noi_dung) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                var ngay_tao = moment(ngay_tao).format('YYYY-MM-DD hh:mm:ss');
                axios
                    .post("http://localhost:3000/tintucs", {
                        tieu_de,
                        noi_dung,
                        ngay_tao,
                        // file,
                        nhanvien_id,
                    })
                    .then(() => {
                        setState({
                            tieu_de: "",
                            noi_dung: "",
                            ngay_tao: "",
                            // file: "",
                            nhanvien_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Thêm thành công!")
            }
            setTimeout(() => history.push("/tintuc"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-addtt">
                <header className='header'>Thêm Tin Tức</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-addtt first-addtt">
                        <div className="details personal">
                            <span className="title-addtt"></span>

                            <div className="fields-addtt">
                                <div className="input-field-addtt">
                                    <label className='label'>Tiêu Đề</label>
                                    <input
                                        className='input-title'
                                        type="text"
                                        id='tieu_de'
                                        name='tieu_de'
                                        value={tieu_de || ""}
                                        placeholder="Nhập Tiêu Đề . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.tieu_de}</p>
                                </div>

                                <div className="input-field-addtt">

                                </div>

                                <div className="input-field-addtt">
                                    <label className='label'>Ngày Tạo</label>
                                    <input
                                        type="datetime-local"
                                        id='ngay_tao'
                                        name='ngay_tao'
                                        value={ngay_tao || ""}
                                        placeholder="Chọn Ngày"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_tao}</p>
                                </div>

                                <div className="input-field-addtt">
                                    <label className='label'>Nội dung</label>
                                    <br />
                                    {/* <input
                                        className='input-content'
                                        type="text"
                                        id='noi_dung'
                                        name='noi_dung'
                                        value={noi_dung || ""}
                                        placeholder="Enter your content"
                                        required
                                        onChange={handleInputChange}
                                    /> */}
                                    <textarea
                                        className="textarea"
                                        type="text"
                                        id='noi_dung'
                                        name='noi_dung'
                                        value={noi_dung || ""}
                                        placeholder="Nhập Nội Dung..."
                                        required
                                        onChange={handleInputChange}
                                    >

                                    </textarea>
                                    <p className="error-text">{validationMsg.noi_dung}</p>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-addtt">Thông tin người tạo</span>
                            <div className="fields-addtt">
                                <div className="input-field-addtt">
                                    <label className='label'>Nhân Viên</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="nhanvien_id"
                                        id='nhanvien_id'
                                        value={nhanvien_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Tên Nhân Viên--</option>
                                        {
                                            nhanvien.map((getnv, index) => (
                                                <option key={index} value={getnv.id}>{getnv.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="buttons">

                                <Link to="/tintuc" className="backBtn">
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

export default AddTT