import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddKBT_NNN.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

// import Moment from 'react-moment';
// import 'moment-timezone';
// import moment from 'moment';

const initialState = {
    ho_ten: "",
    ngay_sinh: "",
    gioi_tinh: "",
    email: "",
    so_ho_chieu: "",
    dia_chi: "",
    sdt: "",
    ngay_dang_ky: "",
    ngay_den_luu_tru: "",
    // file: "",
    cslt_id: "",
    quoc_tich_id: "",
    kbt_status_id: ""
}

const AddKBT_Client = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, ngay_sinh, gioi_tinh, email, so_ho_chieu, dia_chi, sdt, ngay_dang_ky, ngay_den_luu_tru, cslt_id, quoc_tich_id, kbt_status_id } = state;

    const [validationMsg, setValidationMsg] = useState({});

    const history = useHistory();

    const { id } = useParams();

    const [cslt, setCslt] = useState([]);

    const [quoctich, setQuoc_tich] = useState([]);

    const [kbt, setKbt] = useState([]);

    const [nnn, setNnn] = useState([]);

    //Nguoi Nuoc Ngoai
    useEffect(() => {
        const getNnn = async () => {
            const response = JSON.parse(localStorage.getItem('user'));
            const id = response[0].id;
            console.log(id)
            const resnnn = await fetch(`http://localhost:3000/nguoinuocngoaisuserone/${id}`);
            const resn = await resnnn.json();
            console.log(resn)
            setNnn(await resn);
        }
        getNnn();
    }, []);

    //CSLT
    useEffect(() => {
        const getCslt = async () => {
            const rescslt = await fetch(`http://localhost:3000/cslts/${id}`);
            const resc = await rescslt.json();
            setCslt(await resc);
        }
        getCslt();
    }, []);

    //Quoc_Tich
    useEffect(() => {
        const getquoc_tich = async () => {
            const resquoctich = await fetch("http://localhost:3000/quoctichs");
            const resqt = await resquoctich.json();
            setQuoc_tich(await resqt);
        }
        getquoc_tich();
    }, []);

    //kbt_status
    useEffect(() => {
        const getkbt = async () => {
            const reskbt = await fetch("http://localhost:3000/kbtstatus");
            const resk = await reskbt.json();
            setKbt(await resk);
        }
        getkbt();
    }, []);

    //Nguoi_nuoc_ngoai
    useEffect(() => {
        const response = JSON.parse(localStorage.getItem('user'));
        const id = response[0].id;
        axios
            .get(`http://localhost:3000/nguoinuocngoaisuserone/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);

    const validateAll = () => {
        const msg = {}

        // for (var key in user) {
        //     if (user[key].email == email) {
        //         msg.email = "Email ???? ???????c S??? D???ng!"
        //     }
        // }

        // console.log(sdt[0]) //b???t ?????u b???ng s??? 0

        if (sdt.length != 10 || sdt[0] != 0) {
            msg.sdt = "S??? ??i???n tho???i kh??ng t???n t???i!"
        }

        // var PhoneNumber;
        // for (var i = 0; i < user.length; i++) {
        //     PhoneNumber = user[i].sdt;
        //     if (PhoneNumber == sdt) {
        //         msg.sdt = "S??? ??i???n tho???i ???? ???????c s??? d???ng!"
        //     }
        // }

        let date = moment(Date()).format("YYYY-MM-DD hh:mm");
        let year = moment(Date()).format("YYYY");
        // console.log(date)

        if ((year - (moment(ngay_sinh).format("YYYY"))) < 18) {
            msg.ngay_sinh = "Tu???i kh??ng h???p l???!"
        }

        if (so_ho_chieu.length < 3) {
            msg.so_ho_chieu = "S??? h??? chi???u kh??ng t???n t???i!"
        }

        if (ngay_den_luu_tru < date) {
            msg.ngay_den_luu_tru = "Ng??y ?????n l??u tr?? ph???i b???ng ho???c l???n h??n ng??y hi???n t???i!"
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
        if (isEmpty(so_ho_chieu)) {
            msg.so_ho_chieu = "Vui l??ng nh???p s??? h??? chi???u"
        }
        if (isEmpty(dia_chi)) {
            msg.dia_chi = "Vui l??ng nh???p ?????a ch???"
        }
        if (isEmpty(sdt)) {
            msg.sdt = "Vui l??ng nh???p s??? ??i???n tho???i"
        }
        // if (isEmpty(ngay_dang_ky)) {
        //     msg.ngay_dang_ky = "Vui l??ng ch???n ng??y khai b??o"
        // }
        if (isEmpty(ngay_den_luu_tru)) {
            msg.ngay_den_luu_tru = "Vui l??ng ch???n ng??y ?????n l??u tr??"
        }
        // if (isEmpty(file)) {
        //     msg.file = "Please input your File"
        // }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    // const ns = ngay_sinh.slice(0, 10)

    const ns = moment(ngay_sinh).format("YYYY-MM-DD")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ho_ten || !gioi_tinh || !email || !so_ho_chieu || !dia_chi || !sdt || !ngay_den_luu_tru) {
            toast.error("Vui l??ng nh???p ?????y ????? th??ng tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
                var ngay_dang_ky = moment(ngay_dang_ky).format('YYYY-MM-DD hh:mm:ss');

                // var ngay_sinh = moment(ngay_sinh).format("YYYY-MM-DD")

                // var ngay_sinh = ngay_sinh.splice(1, 2)

                // console.log(ngay_sinh[1])
                var ngay_sinh = ns;

                console.log(ngay_sinh)

                var cslt_id = id;

                axios
                    .post("http://localhost:3000/khaibaotruocs", {
                        ho_ten,
                        ngay_sinh,
                        gioi_tinh,
                        email,
                        so_ho_chieu,
                        dia_chi,
                        sdt,
                        ngay_dang_ky,
                        ngay_den_luu_tru,
                        // file,
                        cslt_id,
                        quoc_tich_id,
                        // kbt_status_id
                    })
                    .then(() => {
                        setState({
                            ho_ten: "",
                            ngay_sinh: "",
                            gioi_tinh: "",
                            email: "",
                            so_ho_chieu: "",
                            dia_chi: "",
                            sdt: "",
                            ngay_dang_ky: "",
                            ngay_den_luu_tru: "",
                            // file: "",
                            cslt_id: "",
                            quoc_tich_id: "",
                            // kbt_status_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Khai B??o Th??nh C??ng, Vui l??ng ?????n l??u tr?? ????ng ng??y!")
            }
            setTimeout(() => history.push("/client"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-addkbt">
                <header className='header'>Khai B??o Th??ng Tin L??u Tr??</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-addkbt first-addkbt">
                        <div className="details personal">
                            <span className="title-addkbt">Th??ng tin khai b??o</span>

                            <div className="fields-addkbt">
                                <div className="input-field-addkbt">
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
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div>

                                {/* <div className="input-field-addkbt">
                                    <label className='label'>H??? T??n</label>
                                    <input
                                        type="text"
                                        id='ho_ten'
                                        name='ho_ten'
                                        value={ho_ten}
                                        placeholder="Nh???p h??? t??n . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div> */}

                                <div className="input-field-addkbt">
                                    <label className='label'>Ng??y sinh</label>
                                    <input
                                        type="date"
                                        id='ngay_sinh'
                                        name='ngay_sinh'
                                        value={moment(ngay_sinh).format("YYYY-MM-DD")}
                                        // value={ngay_sinh}
                                        placeholder="Ch???n ng??y sinh"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_sinh}</p>

                                </div>
                                {/* <div className="input-field-addkbt">
                                    <label className='label'>Ng??y Sinh</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="ngay_sinh"
                                        id='ngay_sinh'
                                        // value={ngay_sinh || ""}
                                        value={moment(ngay_sinh).format("YYYY-MM-DD")}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--ngay_sinh--</option>
                                        {
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.ngay_sinh} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.gioi_tinh}</p>
                                </div> */}

                                <div className="input-field-addkbt">
                                    <label className='label'>X??c nh???n gi???i t??nh</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="gioi_tinh"
                                        id='gioi_tinh'
                                        value={gioi_tinh || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Gi???i t??nh--</option>
                                        {
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.gioi_tinh} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.gioi_tinh}</p>
                                </div>

                                <div className="input-field-addkbt">
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
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.email} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.email}</p>
                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>X??c nh???n S??? H??? Chi???u</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="so_ho_chieu"
                                        id='so_ho_chieu'
                                        value={so_ho_chieu || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--S??? H??? Chi???u--</option>
                                        {
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.so_ho_chieu} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.so_ho_chieu}</p>
                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>X??c nh???n s??? ??i???n tho???i</label>
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
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.sdt} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>X??c nh???n ?????a ch???</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="dia_chi"
                                        id='dia_chi'
                                        value={dia_chi || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--?????a Ch???--</option>
                                        {
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.dia_chi} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.dia_chi}</p>
                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>X??c nh???n ID Qu???c T???ch</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="quoc_tich_id"
                                        id='quoc_tich_id'
                                        value={quoc_tich_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Qu???c T???ch--</option>
                                        {
                                            nnn.map((getus, index) => (
                                                <option key={index}>{getus.quoc_tich_id} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.quoc_tich_id}</p>
                                </div>

                                {/* <div className="input-field-addkbt">
                                    <label className='label'>Ng??y Khai B??o</label>
                                    <input
                                        type="date"
                                        id='ngay_dang_ky'
                                        name='ngay_dang_ky'
                                        // value={moment(ngay_dang_ky).format('YYYY-MM-DD') || ""}
                                        placeholder="Enter birth date"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_dang_ky}</p>

                                </div> */}

                                <div className="input-field-addkbt">

                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>Ng??y ?????n L??u Tr??</label>
                                    <input
                                        type="datetime-local"
                                        id='ngay_den_luu_tru'
                                        name='ngay_den_luu_tru'
                                        value={ngay_den_luu_tru || ""}
                                        placeholder="Ch???n Ng??y ?????n L??u Tr??"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ngay_den_luu_tru}</p>

                                </div>

                                <div className="input-field-addkbt">
                                    <label className='label'>C?? S??? L??u Tr??</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="cslt_id"
                                        id='cslt_id'
                                        value={cslt_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--T??n C?? S??? L??u Tr??--</option>
                                        {
                                            cslt.map((getcslt, index) => (
                                                <option key={index} value={getcslt.id}>{getcslt.ten_cslt} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-addkbt">

                                </div>

                                {/* <div className="input-field-addkbt">
                                    <label className='label'>Tr???ng Th??i</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="kbt_status_id"
                                        id='kbt_status_id'
                                        value={kbt_status_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Tr???ng Th??i--</option>
                                        {
                                            kbt.map((getkbt, index) => (
                                                <option key={index} value={getkbt.id}>{getkbt.status_name} </option>
                                            ))
                                        }
                                    </select>
                                </div> */}



                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title-addkbt"></span>

                            <div className="fields-addkbt">

                            </div>
                            <div className="buttons">
                                <Link to="/client" className="backBtn">
                                    <div className="backBtn" >
                                        <i className="uil uil-navigator"></i>
                                        <span className="btnText">Quay l???i</span>
                                    </div>
                                </Link>
                                <button className="submit" type='submit'>
                                    <span className="btnText">G???i</span>
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

export default AddKBT_Client