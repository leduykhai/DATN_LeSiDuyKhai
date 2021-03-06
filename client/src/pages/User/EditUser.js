import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./EditUser.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

import ENDPOINT from '../../api/endpoint'



const initialState = {
    ho_ten: "",
    email: "",
    password: "",
    sdt: "",
    user_status_id: "",
    role_id: ""
}

const EditUser = () => {
    const [state, setState] = useState(initialState);

    const { ho_ten, email, password, sdt, user_status_id, role_id } = state;

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

        if (isEmpty(email)) {
            msg.email = "Vui l??ng nh???p email"
        } else if (!isEmail(email)) {
            msg.email = "Email kh??ng ????ng"
        }

        // for (var key in user) {
        //     if (user[key].email === email) {
        //         msg.email = "Email ???? ???????c S??? D???ng!"
        //     }
        // }

        if (sdt.length != 10 || sdt[0] != 0) {
            msg.sdt = "S??? ??i???n tho???i kh??ng t???n t???i"
        }

        if (password.length < 6) {
            msg.password = "M???t kh???u t??? 6 k?? t???!"
        }

        // var PhoneNumber;
        // for (var i = 0; i < user.length; i++) {
        //     PhoneNumber = user[i].sdt;
        //     if (PhoneNumber === sdt) {
        //         msg.sdt = "S??? ??i???n tho???i ???? ???????c s??? d???ng!"
        //     }
        // }

        // if (isEmpty(password)) {
        //     msg.password = "Please input your Password"
        // }

        const response = JSON.parse(localStorage.getItem('user'));

        if (response[0].id != 1) {
            if (role_id == 1 || role_id == 2) {
                msg.role_id = "Vui l??ng ch???n ????ng vai tr??!"
            }
        }

        if (isEmpty(ho_ten)) {
            msg.ho_ten = "Vui l??ng nh???p h??? t??n"
        }

        if (isEmpty(sdt)) {
            msg.sdt = "Vui l??ng nh???p s??? ??i???n tho???i"
        }

        // if (isEmpty(user_status_id)) {
        //     msg.user_status_id = "Please input your Status"
        // }

        // if (isEmpty(role_id)) {
        //     msg.role_id = "Please input your Role"
        // }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ho_ten || !email || !password || !sdt || !user_status_id || !role_id) {
            toast.error("Vui l??ng nh???p ?????y ????? th??ng tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
                axios
                    .put("http://localhost:3000/users", {
                        id,
                        ho_ten,
                        email,
                        password,
                        sdt,
                        user_status_id,
                        role_id,
                    })
                    .then(() => {
                        setState({
                            ho_ten: "",
                            email: "",
                            password: "",
                            sdt: "",
                            user_status_id: "",
                            role_id: ""
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("C???p nh???t th??nh c??ng!")
            }
            setTimeout(() => history.goBack("/users"), 100);
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
            <div className="container-edituser">
                <header className='header'>C???p nh???t</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-edituser first-edituser">
                        <div className="details personal">
                            <span className="title-edituser">Th??ng tin t??i kho???n</span>

                            <div className="fields-edituser">

                                <div className="input-field-edituser">
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
                                </div>

                                <div className="input-field-edituser">
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

                                <div className="input-field-edituser">
                                    <label className='label'>M???t kh???u</label>
                                    <input
                                        type="password"
                                        id='password'
                                        name='password'
                                        value={password || ""}
                                        placeholder="Nh???p m???t kh???u . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.password}</p>
                                </div>



                                <div className="input-field-edituser">
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

                                <div className="input-field-edituser">
                                    <label className='label'>Tr???ng th??i</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="user_status_id"
                                        id='user_status_id'
                                        value={user_status_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="" >-- Ch???n Tr???ng th??i --</option>
                                        {
                                            userstatus.map((getus, index) => (
                                                <option key={index} value={getus.id}>{getus.status_name} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-edituser">
                                    <label className='label'>Vai Tr??</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="role_id"
                                        id='role_id'
                                        value={role_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="" >-- Ch???n vai Tr?? --</option>
                                        {
                                            usersrole.map((getrl, index) => (
                                                <option key={index} value={getrl.id}>{getrl.role_name} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.role_id}</p>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">

                            <div className="buttons">
                                {/* <Link to="/users" className="backBtn"> */}
                                <div className="backBtn" onClick={handleBack}>
                                    <i className="uil uil-navigator"></i>
                                    <span className="btnText">Quay L???i</span>
                                </div>
                                {/* </Link> */}
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

export default EditUser

// import React, { useState, useEffect } from 'react';
// import { useHistory, useParams, Link } from 'react-router-dom';
// import isEmail from "validator/lib/isEmail";
// import isEmpty from "validator/lib/isEmpty";
// import { isDate } from 'moment';
// import "./EditUser.scss";
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const initialState = {
//     email: "",
//     password: "",
//     ho_ten: "",
//     sdt: "",
//     user_status_id: "",
//     role_id: ""
// }

// const EditUser = () => {
//     const [state, setState] = useState(initialState);

//     const { email, password, ho_ten, sdt, user_status_id, role_id } = state;

//     const [validationMsg, setValidationMsg] = useState({})

//     const history = useHistory();

//     const { id } = useParams();

//     useEffect(() => {
//         axios
//             .get(`http://localhost:3000/users/${id}`)
//             .then((resp) => setState({ ...resp.data[0] }));
//     }, [id]);


//     const validateAll = () => {
//         const msg = {}
//         if (isEmpty(email)) {
//             msg.email = "Please input your Email"
//         } else if (!isEmail(email)) {
//             msg.email = "Your email is incorrect"
//         }

//         if (isEmpty(password)) {
//             msg.password = "Please input your Password"
//         }

//         setValidationMsg(msg)
//         if (Object.keys(msg).length > 0) return false
//         return true
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!email || !password) {
//             toast.error("please provide value into each input field");
//         }
//         const isValid = validateAll()
//         if (!isValid) return
//         else {
//             // if (!id) {
//             //     axios
//             //         .post("http://localhost:3000/users", {
//             //             email,
//             //             password
//             //         })
//             //         .then(() => {
//             //             setState({ email: "", password: "" });
//             //         })
//             //         .catch((err) => toast.error(err.response.data));
//             //     toast.success("Users Added Successfully")
//             // }
//             // else {
//             if (id) {
//                 axios
//                     .put(`http://localhost:3000/users`, {
//                         id,
//                         email,
//                         password
//                     })
//                     .then(() => {
//                         setState({ email: "", password: "" });
//                     })
//                     .catch((err) => toast.error(err.response.data));
//                 toast.success("User Update Successfully")
//             }
//             setTimeout(() => history.push("/users"), 100);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setState({ ...state, [name]: value });
//     }

//     return (
//         <div style={{ marginTop: "100px" }}>
//             <form style={{
//                 margin: "auto",
//                 padding: "15px",
//                 maxWidth: "400px",
//                 alignContent: "center"
//             }}
//                 onSubmit={handleSubmit}
//             >
//                 <label htmlFor='email'>UserName</label>
//                 <input
//                     type="text"
//                     className='text'
//                     id='email'
//                     name='email'
//                     placeholder='email...'
//                     value={email || ""}
//                     onChange={handleInputChange}
//                 />
//                 <p className="error-text">{validationMsg.email}</p>
//                 <label htmlFor='password'>Password</label>
//                 <input
//                     type="text"
//                     className='text'
//                     id='password'
//                     name='password'
//                     placeholder='password...'
//                     value={password || ""}
//                     onChange={handleInputChange}
//                 />
//                 <p className="error-text">{validationMsg.password}</p>
//                 <input type="submit" className='submit' value={id ? "Update" : "Save"} />
//                 <Link to="/users">
//                     <input type="button" className='button' value="Go Back" />
//                 </Link>
//             </form>
//         </div>
//     )
// }

// export default EditUser