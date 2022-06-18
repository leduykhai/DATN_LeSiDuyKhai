import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./DangKyGT.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const initialState = {
    so_phong: "",
    muc_do_danh_gia: "",
    gioi_thieu: "",
    trang_thai: "",
    // file: "",
    cslt_id: ""
}

const DangKyGT = () => {
    const [state, setState] = useState(initialState);

    const { so_phong, muc_do_danh_gia, gioi_thieu, trang_thai, cslt_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [cslt, setCslt] = useState([]);

    //CSLT
    useEffect(() => {
        const getCslt = async () => {
            const rescslt = await fetch(`http://localhost:3000/csltsmaxid`);
            const resc = await rescslt.json();
            setCslt(await resc);
        }
        getCslt();
    }, []);

    const validateAll = () => {
        const msg = {}

        if (isEmpty(so_phong)) {
            msg.so_phong = "Vui lòng nhập số phòng!"
        }
        if (isEmpty(muc_do_danh_gia)) {
            msg.muc_do_danh_gia = "Vui lòng nhập mức độ đánh giá!"
        }
        if (isEmpty(gioi_thieu)) {
            msg.gioi_thieu = "Vui nhập giới thiệu!"
        }
        if (isEmpty(trang_thai)) {
            msg.trang_thai = "Vui nhập trạng thái!"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!so_phong || !muc_do_danh_gia || !gioi_thieu || !trang_thai) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                axios
                    .post("http://localhost:3000/ct_cslts", {
                        so_phong,
                        muc_do_danh_gia,
                        gioi_thieu,
                        trang_thai,
                        cslt_id,
                    })
                    .then(() => {
                        setState({
                            so_phong: "",
                            muc_do_danh_gia: "",
                            gioi_thieu: "",
                            trang_thai: "",
                            cslt_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Thông tin đăng ký của bạn đã được gửi đến nhân viên, vui lòng đợi phê duyệt!")
            }
            // else {
            //     axios
            //         .put("http://localhost:3000/ct_cslts", {
            //             id,
            //             so_phong,
            //             muc_do_danh_gia,
            //             gioi_thieu,
            //             trang_thai,
            //             cslt_id,
            //         })
            //         .then(() => {
            //             setState({
            //                 so_phong: "",
            //                 muc_do_danh_gia: "",
            //                 gioi_thieu: "",
            //                 trang_thai: "",
            //                 cslt_id: ""
            //             });
            //         })
            //         .catch((err) => toast.error(err.response.data));
            //     toast.success("Cập nhật thành công!")
            // }
            setTimeout(() => history.push("/client"), 100);
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
            <div className="container-dangkygt">
                <header className='header'>Thông tin giới thiệu</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-dangkygt first-dangkygt">
                        <h4 className='luu_y'>Bạn Phải Chịu Trách Nhiệm Trước Pháp Luật Về Nội Dung Khai Báo!</h4>
                        <div className="details personal">
                            <span className="title-dangkygt"></span>

                            <div className="fields-dangkygt">

                                <div className="input-field-dangkygt">
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

                                <div className="input-field-dangkygt">
                                    <label className='label'>Trạng thái</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="trang_thai"
                                        id='trang_thai'
                                        value={trang_thai || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Trạng thái--</option>
                                        <option>Còn Phòng</option>
                                        <option>Hết Phòng</option>
                                    </select>
                                </div>


                                <div className="input-field-dangkygt">
                                    <label className='label'>Mức độ đánh giá</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="muc_do_danh_gia"
                                        id='muc_do_danh_gia'
                                        value={muc_do_danh_gia || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Mức độ đánh giá--</option>
                                        <option>Chất lượng 1 sao</option>
                                        <option>Chất lượng 2 sao</option>
                                        <option>Chất lượng 3 sao</option>
                                        <option>Chất lượng 4 sao</option>
                                        <option>Chất lượng 5 sao</option>
                                    </select>
                                </div>

                                <div className="input-field-dangkygt">
                                    <label className='label'>Giới thiệu</label>
                                    <br />
                                    <textarea
                                        className="textarea"
                                        type="text"
                                        id='gioi_thieu'
                                        name='gioi_thieu'
                                        value={gioi_thieu || ""}
                                        placeholder="Nhập giới thiệu . . ."
                                        required
                                        onChange={handleInputChange}
                                    >

                                    </textarea>
                                    <p className="error-text">{validationMsg.gioi_thieu}</p>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-dangkygt"></span>
                            <div className="fields-dangkygt">
                                <div className="input-field-dangkygt">
                                    <label className='label'>Số Phòng</label>
                                    <input
                                        className='form-select'
                                        type="number"
                                        id='so_phong'
                                        name='so_phong'
                                        value={so_phong || ""}
                                        placeholder="Nhập số phòng . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.so_phong}</p>
                                </div>
                            </div>
                            <div className="buttons">

                                {/* <Link to="" className="backBtn"> */}
                                {/* <div className="backBtn" onClick={handleBack} >
                                    <i className="uil uil-navigator"></i>
                                    <span className="btnText">Quay lại</span>
                                </div> */}
                                {/* </Link> */}
                                <button className="submit" type='submit'>
                                    <span className="btnText">Hoàn tất</span>
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

export default DangKyGT