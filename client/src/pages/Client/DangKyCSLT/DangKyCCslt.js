import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./DangKyCCslt.scss";
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
    // hinh: "",
    user_id: "",
    phuong_id: "",
    nhanvien_id: ""
}

const DangKyCCslt = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, ngay_sinh, gioi_tinh, email, cccd, dia_chi, sdt, user_id, phuong_id, nhanvien_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [thanh_pho, setThanh_pho] = useState([]);
    const [thanh_pho_id, setThanh_pho_id] = useState('');

    const [quan, setQuan] = useState([]);
    const [quan_id, setQuan_id] = useState('');

    const [phuong, setPhuong] = useState([]);

    const [user, setUser] = useState([]);

    const [useridmax, setUserIdMax] = useState([]);

    const [nhanvien, setNhanvien] = useState([]);

    const [ccslt, setCCslt] = useState([]);

    //thanh pho
    useEffect(() => {
        const getthanh_pho = async () => {
            const resthanh_pho = await fetch("http://localhost:3000/thanhphos");
            const restp = await resthanh_pho.json();
            setThanh_pho(await restp);
        }
        getthanh_pho();
    }, []);

    //id thanh pho
    const handlethanh_pho = (event) => {
        const getThanh_pho_id = event.target.value;
        setThanh_pho_id(getThanh_pho_id);
    }

    //quan
    useEffect(() => {
        const getquan = async () => {
            const resquan = await fetch(`http://localhost:3000/quans/${thanh_pho_id}`);
            const resq = await resquan.json();
            setQuan(await resq);
        }
        getquan();
    }, [thanh_pho_id]);

    //id quan
    const handlequan = (event) => {
        const getquan_id = event.target.value;
        setQuan_id(getquan_id);
    }

    //phuong
    useEffect(() => {
        const getphuong = async () => {
            const resphuong = await fetch(`http://localhost:3000/phuongs/${quan_id}`);
            const rp = await resphuong.json();
            setPhuong(await rp);
        }
        getphuong();
    }, [quan_id]);

    //user
    useEffect(() => {
        const getUser = async () => {
            const resuser = await fetch("http://localhost:3000/users");
            const resu = await resuser.json();
            setUser(await resu);
        }
        getUser();
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

    //nhan vien
    useEffect(() => {
        const getNV = async () => {
            const resnhanvien = await fetch("http://localhost:3000/nhanviens");
            const resnv = await resnhanvien.json();
            setNhanvien(await resnv);
        }
        getNV();
    }, []);

    //Ch??? C?? s??? l??u trus
    useEffect(() => {
        const getCCslt = async () => {
            const rescc = await fetch("http://localhost:3000/chucosoluutrus");
            const resc = await rescc.json();
            setCCslt(await resc);
        }
        getCCslt();
    }, []);

    //chu co so luu tru
    useEffect(() => {
        axios
            // .get(`http://localhost:3000/chucosoluutrus/${id}`)
            .get(`http://localhost:3000/usersidmax`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);

    const validateAll = () => {
        const msg = {}

        let date = moment(Date()).format("YYYY");

        if ((date - (moment(ngay_sinh).format("YYYY"))) < 18) {
            msg.ngay_sinh = "Tu???i t??? 18 tr??? l??n"
        }

        for (var key in ccslt) {
            if (ccslt[key].cccd == cccd) {
                msg.cccd = "CCCD ???? ???????c S??? D???ng!"
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
        // if (isEmpty(hinh)) {
        //     msg.hinh = "Please input your Images"
        // }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ho_ten || !ngay_sinh || !gioi_tinh || !email || !cccd || !dia_chi || !sdt) {
            toast.error("Vui l??ng nh???p ?????y ????? th??ng tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                axios
                    .post("http://localhost:3000/chucosoluutrus", {
                        ho_ten,
                        ngay_sinh,
                        gioi_tinh,
                        email,
                        cccd,
                        dia_chi,
                        sdt,
                        // hinh,
                        user_id,
                        phuong_id,
                        // nhanvien_id,
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
                            // hinh: "",
                            user_id: "",
                            phuong_id: "",
                            // nhanvien_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Ti???p t???c b?????c 3")
            }
            setTimeout(() => history.push("/client_dk_b3"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-dk_ccslt">
                <header className='header'>????ng k?? qu???n l?? l??u tr??</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-dk_ccslt first-dk_ccslt">
                        <h4 className='luu_y'>B???n Ph???i Ch???u Tr??ch Nhi???m Tr?????c Ph??p Lu???t V??? N???i Dung Khai B??o!</h4>
                        <div className="details personal">
                            <span className="title-dk_ccslt">B?????c 2: Th??ng tin ng?????i ????ng k??</span>

                            <div className="fields-dk_ccslt">
                                <div className="input-field-dk_ccslt">
                                    <label className='label'>X??c nh???n t??n ????ng k??</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="ho_ten"
                                        id='ho_ten'
                                        value={ho_ten || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--T??n ????ng k??--</option>
                                        {
                                            useridmax.map((getus, index) => (
                                                <option key={index}>{getus.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div>

                                <div className="input-field-dk_ccslt">
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

                                <div className="input-field-dk_ccslt">
                                    <label className='label'>Gi???i t??nh</label>
                                    <select
                                        type="select"
                                        id='gioi_tinh'
                                        name='gioi_tinh'
                                        value={gioi_tinh || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""}>--Ch???n gi???i t??nh--</option>
                                        {/* <option>--Select gender--</option> */}
                                        <option>Nam</option>
                                        <option>N???</option>
                                        <option>Kh??c</option>
                                    </select>
                                </div>

                                <div className="input-field-dk_ccslt">
                                    <label className='label'>X??c nh???n Email</label>
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
                                            useridmax.map((getus, index) => (
                                                <option key={index} >{getus.email} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.email}</p>
                                </div>

                                <div className="input-field-dk_ccslt">
                                    <label className='label'>C??n c?????c c??ng d??n</label>
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

                                <div className="input-field-dk_ccslt">
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

                                <div className="input-field-dk_ccslt">
                                    <label className='label'>Th??nh ph???</label>
                                    <select
                                        className="form-control p-2"
                                        name="thanh_pho"
                                        id='thanh_pho'
                                        required
                                        onChange={(e) => handlethanh_pho(e)}
                                    >
                                        <option disabled selected value="">--Th??nh Ph???--</option>
                                        {
                                            thanh_pho.map((getcity, index) => (
                                                <option key={index} value={getcity.id} >{getcity.ten_thanh_pho} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-dk_ccslt">
                                    <label className='label'>Qu???n</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="district"
                                        id='district'
                                        required
                                        onChange={(e) => handlequan(e)}
                                    >
                                        <option disabled selected value="">--Qu???n--</option>
                                        {
                                            quan.map((getdistrict, index) => (
                                                <option key={index} value={getdistrict.id}>{getdistrict.ten_quan} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-dk_ccslt">
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
                                        <option disabled selected value="">--Ph?????ng--</option>
                                        {
                                            phuong.map((getward, index) => (
                                                <option key={index} value={getward.id}> {getward.ten_phuong} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-dk_ccslt">
                                    <label className='label'>X??c nh???n S??? ??i???n tho???i</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="sdt"
                                        id='sdt'
                                        value={sdt || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--S??? ??i???n tho???i--</option>
                                        {
                                            useridmax.map((getus, index) => (
                                                <option key={index}>{getus.sdt} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>

                                <div className="input-field-dk_ccslt">
                                    <label className='label'>X??c nh???n ID ng?????i ????ng k??</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="user_id"
                                        id='user_id'
                                        value={user_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--ID ????ng k??--</option>
                                        {
                                            useridmax.map((getus, index) => (
                                                <option key={index} value={getus.id}>{getus.ho_ten}</option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.user_id}</p>
                                </div>

                                <div className="input-field-dk_ccslt">

                                </div>

                                {/* <div className="input-field-dk_ccslt">
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
                            <span className="title-dk_ccslt"></span>

                            <div className="fields-dk_ccslt">


                                {/* <div className="input-field-dk_ccslt">
                                    <label className='label'>Nh??n vi??n ph?? duy???t</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="nhanvien_id"
                                        id='nhanvien_id'
                                        value={nhanvien_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--T??n nh??n vi??n--</option>
                                        {
                                            nhanvien.map((getnv, index) => (
                                                <option key={index} value={getnv.id}>{getnv.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                </div> */}

                                <div className="input-field-dk_ccslt">

                                </div>
                            </div>
                            <div className="buttons">
                                {/* <Link to="/chucslt" className="backBtn">
                                    <div className="backBtn" >
                                        <i className="uil uil-navigator"></i>
                                        <span className="btnText">Back</span>
                                    </div>
                                </Link> */}
                                <button className="submit" type='submit'>
                                    <span className="btnText">Ti???p theo</span>
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

export default DangKyCCslt