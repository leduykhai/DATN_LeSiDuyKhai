import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./DangKyAccount.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


const initialState = {
    email: "",
    password: "",
    ho_ten: "",
    sdt: "",
    user_status_id: "",
    role_id: ""
}

const DangKyAccount = () => {
    const [state, setState] = useState(initialState);

    const { email, password, ho_ten, sdt, user_status_id, role_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [user, setUser] = useState([]);

    const [userstatus, setUser_Status] = useState([]);

    const [usersrole, setUser_Role] = useState([]);
    // const [khu_vuc_id, setKhu_vuc_id] = useState('');

    //user
    useEffect(() => {
        const getUser = async () => {
            const resuser = await fetch("http://localhost:3000/users");
            const resu = await resuser.json();
            setUser(await resu);
        }
        getUser();
    }, []);

    useEffect(() => {
        const getuser_status = async () => {
            const resuse_status = await fetch("http://localhost:3000/userstatus");
            const resus = await resuse_status.json();
            setUser_Status(await resus);
        }
        getuser_status();
    }, []);

    useEffect(() => {
        const getuser_role = async () => {
            const resuser_role = await fetch("http://localhost:3000/userrole");
            const resrl = await resuser_role.json();
            setUser_Role(await resrl);
        }
        getuser_role();
    }, []);

    // const handlekhu_vuc = (event) => {
    //     const getkhu_vuc_id = event.target.value;
    //     setKhu_vuc_id(getkhu_vuc_id);
    // }


    useEffect(() => {
        axios
            .get(`http://localhost:3000/users/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);


    const validateAll = () => {
        const msg = {}

        // var username;
        // for (var i = 0; i < user.length; i++) {
        //     username = user[i].email;
        //     if (username === email) {
        //         msg.email = "Email already in use"
        //     }
        // }

        for (var key in user) {
            if (user[key].email == email) {
                msg.email = "Email ???? ???????c S??? D???ng!"
            }
        }

        // console.log(sdt[0]) //b???t ?????u b???ng s??? 0

        if (sdt.length != 10 || sdt[0] != 0) {
            msg.sdt = "S??? ??i???n tho???i kh??ng t???n t???i"
        }

        if (password.length < 6) {
            msg.password = "M???t kh???u t??? 6 k?? t???!"
        }

        var PhoneNumber;
        for (var i = 0; i < user.length; i++) {
            PhoneNumber = user[i].sdt;
            if (PhoneNumber == sdt) {
                msg.sdt = "S??? ??i???n tho???i ???? ???????c s??? d???ng!"
            }
        }

        if (isEmpty(email)) {
            msg.email = "Vui l??ng nh???p email"
        } else if (!isEmail(email)) {
            msg.email = "Email kh??ng ????ng"
        }

        if (isEmpty(password)) {
            msg.password = "Vui l??ng nh???p m???t kh???u"
        }

        if (isEmpty(ho_ten)) {
            msg.ho_ten = "Vui l??ng nh???p h??? t??n"
        }

        if (isEmpty(sdt)) {
            msg.sdt = "Vui l??ng nh???p s??? ??i???n tho???i"
        }

        // if (isEmpty(user_status_id)) {
        //     msg.user_status_id = "Vui l??ng ch???n tr???ng th??i"
        // }

        // if (isEmpty(role_id)) {
        //     msg.role_id = "Vui l??ng ch???n vai tr??"
        // }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !ho_ten || !sdt) {
            toast.error("Vui l??ng nh???p ?????y ????? th??ng tin");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
                var user_status_id = 2;
                var role_id = 3;
                axios
                    .post("http://localhost:3000/users", {
                        email,
                        password,
                        ho_ten,
                        sdt,
                        user_status_id,
                        role_id,
                    })
                    .then(() => {
                        setState({
                            email: "",
                            password: "",
                            ho_ten: "",
                            sdt: "",
                            user_status_id: "",
                            role_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Ti???p t???c b?????c 2")
            }
            setTimeout(() => history.push("/client_dk_b2"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-dk_ac">
                <header className='header'>????ng k?? Qu???n l?? l??u tr??</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-dk_ac first-dk_ac">
                        <h4 className='luu_y'>B???n Ph???i Ch???u Tr??ch Nhi???m Tr?????c Ph??p Lu???t V??? N???i Dung Khai B??o!</h4>
                        <div className="details personal">
                            <span className="title-dk_ac">B?????c 1: Nh???p th??ng tin t??i kho???n</span>

                            <div className="fields-dk_ac">

                                <div className="input-field-dk_ac">
                                    <label className='label'>H??? t??n</label>
                                    <input
                                        type="text"
                                        id='ho_ten'
                                        name='ho_ten'
                                        value={ho_ten || ""}
                                        placeholder="Nh???p h??? t??n  . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div>

                                <div className="input-field-dk_ac">
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

                                <div className="input-field-dk_ac">
                                    <label className='label'>M???t Kh???u</label>
                                    <input
                                        type="text"
                                        id='password'
                                        name='password'
                                        value={password || ""}
                                        placeholder="Nh???p m???t kh???u"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.password}</p>
                                </div>



                                <div className="input-field-dk_ac">
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
                                </div>

                                {/* <div className="input-field-dk_ac">
                                    <label className='label'>Tr???ng th??i</label>
                                    <select
                                        type="select"
                                        id='user_status_id'
                                        name='user_status_id'
                                        value={user_status_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""}>--Tr???ng th??i--</option> */}
                                {/* <option>--Select gender--</option> */}
                                {/* <option value={2}>Ch??? X??c Nh???n</option>
                                    </select>
                                </div> */}

                                {/* <div className="input-field-dk_ac">
                                    <label className='label'>Vai Tr??</label>
                                    <select
                                        type="select"
                                        id='role_id'
                                        name='role_id'
                                        value={role_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value={""}>--Vai Tr??--</option> */}
                                {/* <option>--Select gender--</option> */}
                                {/* <option value={3}>Ch??? C?? S??? L??u Tr??</option>
                                    </select>
                                </div> */}
                            </div>
                        </div>

                        <div className="details ID">

                            <div className="buttons">
                                <Link to="/client" className="backBtn">
                                    <div className="backBtn" >
                                        <i className="uil uil-navigator"></i>
                                        <span className="btnText">Hu???</span>
                                    </div>
                                </Link>
                                <button className="submit" type='submit'>
                                    <span className="btnText">Ti???p Theo</span>
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

export default DangKyAccount