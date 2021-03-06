import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./AddUser.scss";
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

const AddUser = () => {
    const [state, setState] = useState(initialState);

    const { email, password, ho_ten, sdt, user_status_id, role_id } = state;

    const [validationMsg, setValidationMsg] = useState({})

    const history = useHistory();

    const { id } = useParams();

    const [user, setUser] = useState([]);

    const [kbt, setKbt] = useState([]);

    const [userstatus, setUser_Status] = useState([]);

    const [usersrole, setUser_Role] = useState([]);
    // const [khu_vuc_id, setKhu_vuc_id] = useState('');

    //Khai bao truoc
    useEffect(() => {
        const getKbt = async () => {
            const reskbt = await fetch(`http://localhost:3000/khaibaotruocs/${id}`);
            const resk = await reskbt.json();
            localStorage.setItem("kbt", JSON.stringify(resk))
            setKbt(await resk);
        }
        getKbt();
    }, []);

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
        const response = JSON.parse(localStorage.getItem('kbt'));
        const id = response[0].id
        axios
            .get(`http://localhost:3000/khaibaotruocs/${id}`)
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

        if (isEmpty(user_status_id)) {
            msg.user_status_id = "Vui l??ng ch???n tr???ng th??i"
        }

        if (isEmpty(role_id)) {
            msg.role_id = "Vui l??ng ch???n vai tr??"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !ho_ten || !sdt || !user_status_id || !role_id) {
            toast.error("Vui l??ng nh???p ?????y ????? th??ng tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {
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
                toast.success("????ng k?? th??nh c??ng")
            }
            setTimeout(() => history.push(`/taonnn/${id}`), 100);
        }
    };

    const handleBack = () => {
        setTimeout(() => history.goBack(), 100);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-adduser">
                <header className='header'>Th??m t??i kho???n</header>
                <div>
                    <h3>B??? qua b?????c n??y n???u ng?????i n?????c ngo??i ???? c?? t??i kho???n.<Link to={`/taonnn/${id}`} > B??? Qua</Link></h3>
                </div>
                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-adduser first-adduser">
                        <div className="details personal">
                            <span className="title-adduser">Th??ng tin t??i kho???n</span>

                            <div className="fields-adduser">

                                <div className="input-field-adduser">
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
                                            kbt.map((getus, index) => (
                                                <option key={index}>{getus.ho_ten} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div>

                                <div className="input-field-adduser">
                                    <label className='label'>X??c nh???n Email</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="email"
                                        id='email'
                                        value={email}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--Email--</option>
                                        {
                                            kbt.map((getus, index) => (
                                                <option key={index}>{getus.email} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.email}</p>
                                </div>

                                <div className="input-field-adduser">
                                    <label className='label'>M??t Kh???u</label>
                                    <input
                                        type="text"
                                        id='password'
                                        name='password'
                                        value={password || ""}
                                        placeholder="Nh???p M???t Kh???u . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.password}</p>
                                </div>



                                <div className="input-field-adduser">
                                    <label className='label'>X??c nh???n S??? ??i???n tho???i</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="sdt"
                                        id='sdt'
                                        value={sdt}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="">--S??? ??i???n tho???i--</option>
                                        {
                                            kbt.map((getus, index) => (
                                                <option key={index}>{getus.sdt} </option>
                                            ))
                                        }
                                    </select>
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>


                                <div className="input-field-adduser">
                                    <label className='label'>Tr???ng Th??i</label>
                                    <select
                                        // name="userstatus"
                                        // className="form-control p-2"
                                        // onChange={(e) => handlekhu_vuc(e)}
                                        className="form-select"
                                        type="select"
                                        name="user_status_id"
                                        id='user_status_id'
                                        value={user_status_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="" >-- Ch???n Tr???ng Th??i --</option>
                                        {
                                            userstatus.map((getus, index) => (
                                                <option key={index} value={getus.id}>{getus.status_name} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-adduser">
                                    <label className='label'>vai Tr??</label>
                                    <select
                                        // name="userstatus"
                                        // className="form-control p-2"
                                        // onChange={(e) => handlekhu_vuc(e)}
                                        className="form-select"
                                        type="select"
                                        name="role_id"
                                        id='role_id'
                                        value={role_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="" >-- Ch???n vai tr?? --</option>
                                        <option value={4} >Ng?????i N?????c Ngo??i</option>

                                    </select>
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

export default AddUser


// import React, { useState, useEffect } from 'react';
// import { useHistory, useParams, Link } from 'react-router-dom';
// import isEmail from "validator/lib/isEmail";
// import isEmpty from "validator/lib/isEmpty";
// import "./AddUser.scss";
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const initialState = {
//     email: "",
//     password: ""
// }

// const AddUser = () => {
//     const [state, setState] = useState(initialState);

//     const { email, password } = state;

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
//             if (!id) {
//                 axios
//                     .post("http://localhost:3000/users", {
//                         email,
//                         password
//                     })
//                     .then(() => {
//                         setState({ email: "", password: "" });
//                     })
//                     .catch((err) => toast.error(err.response.data));
//                 toast.success("Users Added Successfully")
//             }
//             // else {
//             //     axios
//             //         .put(`http://localhost:3000/users`, {
//             //             id,
//             //             email,
//             //             password
//             //         })
//             //         .then(() => {
//             //             setState({ email: "", password: "" });
//             //         })
//             //         .catch((err) => toast.error(err.response.data));
//             //     toast.success("User Update Successfully")
//             // }
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

// export default AddUser