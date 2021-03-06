import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./EditTT.scss";
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

const EditTT = () => {
    const [state, setState] = useState(initialState);

    const { tieu_de, noi_dung, ngay_tao, nhanvien_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [thanh_pho, setThanh_pho] = useState([]);
    const [thanh_pho_id, setThanh_pho_id] = useState('');
    const [quan, setQuan] = useState([]);
    const [quan_id, setQuan_id] = useState('');
    const [phuong, setPhuong] = useState([]);

    const [khu_vuc, setKhu_vuc] = useState([]);
    const [khu_vuc_id, setKhu_vuc_id] = useState('');

    const [user, setUser] = useState([]);

    const [nhanvien, setNhanvien] = useState([]);

    const [quoctich, setQuoc_tich] = useState([]);

    const [cslt, setCslt] = useState([]);

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

    const handlekhu_vuc = (event) => {
        const getkhu_vuc_id = event.target.value;
        setKhu_vuc_id(getkhu_vuc_id);
    }

    useEffect(() => {
        const getUser = async () => {
            const resuser = await fetch("http://localhost:3000/users");
            const resu = await resuser.json();
            setUser(await resu);
        }
        getUser();
    }, []);

    useEffect(() => {
        const getNV = async () => {
            const resnhanvien = await fetch("http://localhost:3000/nhanviens");
            const resnv = await resnhanvien.json();
            setNhanvien(await resnv);
        }
        getNV();
    }, []);

    useEffect(() => {
        const getQT = async () => {
            const resquoctich = await fetch("http://localhost:3000/quoctichs");
            const resqt = await resquoctich.json();
            setQuoc_tich(await resqt);
        }
        getQT();
    }, []);


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
            .get(`http://localhost:3000/tintucs/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);


    const validateAll = () => {
        const msg = {}

        if (isEmpty(tieu_de)) {
            msg.tieu_de = "Vui l??ng nh???p ti??u ?????"
        }
        if (isEmpty(noi_dung)) {
            msg.noi_dung = "Vui l??ng nh???p n???i dung"
        }
        if (isEmpty(ngay_tao)) {
            msg.ngay_tao = "Vui l??ng ch???n ng??y t???o"
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
            toast.error("Vui l??ng nh???p ?????y ????? th??ng tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
                var ngay_tao = moment(ngay_tao).format('YYYY-MM-DD hh:mm:ss');
                axios
                    .put("http://localhost:3000/tintucs", {
                        id,
                        tieu_de,
                        noi_dung,
                        // ngay_tao,
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
                toast.success("C???p nh???t th??nh c??ng!")
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
            <div className="container-edittt">
                <header className='header'>C???p nh???t</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-edittt first-edittt">
                        <div className="details personal">
                            <span className="title-edittt">Th??ng tin tin t???c</span>

                            <div className="fields-edittt">
                                <div className="input-field-edittt">
                                    <label className='label'>Ti??u ?????</label>
                                    <input
                                        className='input-title'
                                        type="text"
                                        id='tieu_de'
                                        name='tieu_de'
                                        value={tieu_de || ""}
                                        placeholder="Nh???p Ti??u ????? . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.tieu_de}</p>
                                </div>

                                <div className="input-field-edittt">

                                </div>

                                <div className="input-field-edittt">
                                    <label className='label'>Ng??y T???o</label>
                                    <input
                                        type="text"
                                        id='ngay_tao'
                                        name='ngay_tao'
                                        value={moment(ngay_tao).format("DD-MM-YYYY  hh:mm:ss") || ""}
                                        placeholder="Ch???n Ng??y T???o"
                                        disabled
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_tao}</p>
                                </div>



                                <div className="input-field-edittt ">
                                    <label className='label'>N???i dung</label>
                                    {/* <input
                                        className='input-content'
                                        type="text"
                                        id='noi_dung'
                                        name='noi_dung'
                                        value={noi_dung || ""}
                                        placeholder="Nh???p N???i Dung . . ."
                                        required
                                        onChange={handleInputChange}
                                    /> */}

                                    <textarea
                                        className="textarea"
                                        type="text"
                                        id='noi_dung'
                                        name='noi_dung'
                                        value={noi_dung || ""}
                                        placeholder="Nh???p N???i Dung..."
                                        required
                                        onChange={handleInputChange}
                                    >

                                    </textarea>
                                    <p className="error-text">{validationMsg.noi_dung}</p>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-edittt">Th??ng tin ng?????i t???o</span>
                            <div className="fields-edittt">
                                <div className="input-field-edittt">
                                    <label className='label'>Nh??n Vi??n</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="nhanvien_id"
                                        id='nhanvien_id'
                                        value={nhanvien_id || ""}
                                        disabled
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--T??n Nh??n Vi??n--</option>
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
                                        <span className="btnText">Quay l???i</span>
                                    </div>
                                </Link>
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

export default EditTT