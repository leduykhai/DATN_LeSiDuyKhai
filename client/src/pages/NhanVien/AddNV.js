import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddNV.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
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

const AddNV = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, ngay_sinh, gioi_tinh, email, cccd, dia_chi, sdt, chuc_vu, user_id, phuong_id, khuvuc_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [thanh_pho, setThanh_pho] = useState([]);
    const [thanh_pho_id, setThanh_pho_id] = useState('');

    const [quan, setQuan] = useState([]);
    const [quan_id, setQuan_id] = useState('');

    const [phuong, setPhuong] = useState([]);

    const [khu_vuc, setKhu_vuc] = useState([]);

    const [user, setUser] = useState([]);

    const [nhanvien, setNhanvien] = useState([]);

    const [useridmax, setUserIdMax] = useState([]);


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
        const getUser = async () => {
            const resuser = await fetch("http://localhost:3000/users");
            const resu = await resuser.json();
            setUser(await resu);
        }
        getUser();
    }, []);

    //nhan vien
    useEffect(() => {
        const getNV = async () => {
            const resnhanvien = await fetch("http://localhost:3000/nhanviens");
            const resnv = await resnhanvien.json();
            setNhanvien(await resnv);
        }
        getNV();
    }, []);

    //user ID Max
    useEffect(() => {
        const getUserIM = async () => {
            const resuserim = await fetch("http://localhost:3000/usersidmax");
            const resuim = await resuserim.json();
            setUserIdMax(await resuim);
        }
        getUserIM();
    }, []);


    useEffect(() => {
        axios
            // .get(`http://localhost:3000/nhanviens/${id}`)
            .get(`http://localhost:3000/usersidmax`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);


    const validateAll = () => {
        const msg = {}

        let date = moment(Date()).format("YYYY");

        if ((date - (moment(ngay_sinh).format("YYYY"))) < 18) {
            msg.ngay_sinh = "Tu???i t??? 18 tr??? l??n"
        }

        for (var key in nhanvien) {
            if (nhanvien[key].email == email) {
                msg.email = "Email ???? ???????c S??? D???ng!"
            }
        }

        for (var key in nhanvien) {
            if (nhanvien[key].cccd == cccd) {
                msg.cccd = "CCCD ???? ???????c S??? D???ng!"
            }
        }

        if (sdt.length != 10 || sdt[0] != 0) {
            msg.sdt = "S??? ??i???n tho???i kh??ng t???n t???i"
        }

        var PhoneNumber;
        for (var i = 0; i < nhanvien.length; i++) {
            PhoneNumber = nhanvien[i].sdt;
            if (PhoneNumber == sdt) {
                msg.sdt = "S??? ??i???n tho???i ???? ???????c s??? d???ng!"
            }
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
            msg.email = "Email kh??ng ????ng"
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ho_ten || !ngay_sinh || !gioi_tinh || !email || !cccd || !dia_chi || !sdt || !chuc_vu) {
            toast.error("Vui l??ng nh???p ?????y ????? th??ng tin");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                axios
                    .post("http://localhost:3000/nhanviens", {
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
                toast.success("Th??m th??nh c??ng")
            }
            setTimeout(() => history.push("/nhanvien"), 100);
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
            <div className="container-addnv">
                <header className='header'>Th??m Nh??n Vi??n</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-addnv first-addnv">
                        <div className="details personal">
                            <span className="title-addnv">Th??ng tin c?? nh??n</span>

                            <div className="fields-addnv">
                                {/* <div className="input-field-addnv">
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
                                </div> */}

                                <div className="input-field-addnv">
                                    <label className='label'>X??c Nh???n T??n ????ng K??</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="ho_ten"
                                        id='ho_ten'
                                        value={ho_ten || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--T??n ????ng K??--</option>
                                        {
                                            useridmax.map((getus, index) => (
                                                <option key={index} >{getus.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div>

                                <div className="input-field-addnv">
                                    <label className='label'>Ng??y sinh</label>
                                    <input
                                        type="date"
                                        id='ngay_sinh'
                                        name='ngay_sinh'
                                        value={ngay_sinh || ""}
                                        placeholder="Ch???n ng??y sinh"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_sinh}</p>
                                </div>

                                <div className="input-field-addnv">
                                    <label className='label'>Gi???i t??nh</label>
                                    <select
                                        type="select"
                                        id='gioi_tinh'
                                        name='gioi_tinh'
                                        value={gioi_tinh || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""}>--Ch???n Gi???i t??nh--</option>
                                        {/* <option>--Select gender--</option> */}
                                        <option>Nam</option>
                                        <option>N???</option>
                                        <option>Kh??c</option>
                                    </select>
                                </div>

                                {/* <div className="input-field-addnv">
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
                                </div> */}

                                <div className="input-field-addnv">
                                    <label className='label'>X??c Nh???n Email ????ng K??</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="email"
                                        id='email'
                                        value={email || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Email ????ng K??--</option>
                                        {
                                            useridmax.map((getus, index) => (
                                                <option key={index}>{getus.email} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.email}</p>
                                </div>

                                <div className="input-field-addnv">
                                    <label className='label'>C??n C?????c C??ng d??n</label>
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

                                <div className="input-field-addnv">
                                    <label className='label'>?????a ch???</label>
                                    <input
                                        type="text"
                                        id='dia_chi'
                                        name='dia_chi'
                                        value={dia_chi || ""}
                                        placeholder="Nh???p ?????a ch??? . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.dia_chi}</p>
                                </div>

                                <div className="input-field-addnv">
                                    <label className='label'>Th??nh Ph???</label>
                                    <select
                                        className="form-control p-2"
                                        name="thanh_pho"
                                        id='thanh_pho'
                                        required
                                        onChange={(e) => handlethanh_pho(e)}
                                    >
                                        <option disabled selected value="">--Ch???n Th??nh Ph???--</option>
                                        {
                                            thanh_pho.map((getcity, index) => (
                                                <option key={index} value={getcity.id} >{getcity.ten_thanh_pho} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addnv">
                                    <label className='label'>Qu???n</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="district"
                                        id='district'
                                        required
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

                                <div className="input-field-addnv">
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

                                {/* <div className="input-field-addnv">
                                    <label className='label'>S??? ??i???n tho???i</label>
                                    <input
                                        type="number"
                                        id='sdt'
                                        name='sdt'
                                        value={sdt || ""}
                                        placeholder="Nh???p s??? ??i???n tho???i . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div> */}
                                <div className="input-field-addnv">
                                    <label className='label'>S??? ??i???n Tho???i</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="sdt"
                                        id='sdt'
                                        value={sdt || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--S??? ??i???n Tho???i--</option>
                                        {
                                            useridmax.map((getus, index) => (
                                                <option key={index} >{getus.sdt} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>

                                <div className="input-field-addnv">
                                    <label className='label'>Ch???c V???</label>
                                    <select
                                        type="select"
                                        id='chuc_vu'
                                        name='chuc_vu'
                                        value={chuc_vu || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        {/* <option disabled selected>--Select gender--</option> */}
                                        <option disabled selected value={""}>--Ch???n Ch???c v???--</option>
                                        <option>Nh??n Vi??n</option>
                                    </select>
                                </div>

                                <div className="input-field-addnv">
                                    <label className='label'>Khu V???c Qu???n l??</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="khuvuc_id"
                                        id='khuvuc_id'
                                        value={khuvuc_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Ch???n Khu V???c--</option>
                                        {
                                            khu_vuc.map((getkv, index) => (
                                                <option key={index} value={getkv.id}>{getkv.ten_khu_vuc} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                {/* <div className="input-field-addnv">
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
                                    <p className="error-text">{validationMsg.dia_chi}</p>
                                </div> */}
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-addnv"></span>

                            <div className="fields-addnv">
                                <div className="input-field-addnv">
                                    <label className='label'>T??i kho???n</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="user_id"
                                        id='user_id'
                                        value={user_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--T??n t??i kho???n--</option>
                                        {
                                            useridmax.map((getus, index) => (
                                                <option key={index} value={getus.id}>{getus.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="buttons">

                                {/* <Link to="/nhanvien" className="backBtn"> */}
                                <div className="backBtn" onClick={handleBack} >
                                    <i className="uil uil-navigator"></i>
                                    <span className="btnText">Quay l???i</span>
                                </div>
                                {/* </Link> */}
                                <button className="submit" type='submit'>
                                    <span className="btnText">Th??m</span>
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

export default AddNV