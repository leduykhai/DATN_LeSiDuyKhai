import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import "./EditUser.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';


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

    const [userstatus, setUser_Status] = useState([]);

    const [usersrole, setUser_Role] = useState([]);
    // const [khu_vuc_id, setKhu_vuc_id] = useState('');

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
            msg.email = "Please input your Email"
        } else if (!isEmail(email)) {
            msg.email = "Your email is incorrect"
        }

        // if (isEmpty(password)) {
        //     msg.password = "Please input your Password"
        // }

        if (isEmpty(ho_ten)) {
            msg.ho_ten = "Please input your Name"
        }

        if (isEmpty(sdt)) {
            msg.sdt = "Please input your Phone Number"
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
            toast.error("please provide value into each input field");
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
                toast.success("Users Added Successfully")
            }
            setTimeout(() => history.push("/users"), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <body className='body'>
            <div className="container-edituser">
                <header className='header'>Registration</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-edituser first-edituser">
                        <div className="details personal">
                            <span className="title-edituser">Personal Details</span>

                            <div className="fields-edituser">

                                <div className="input-field-edituser">
                                    <label className='label'>Full Name</label>
                                    <input
                                        type="text"
                                        id='ho_ten'
                                        name='ho_ten'
                                        value={ho_ten || ""}
                                        placeholder="Enter your name"
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
                                        placeholder="Enter your email"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.email}</p>
                                </div>

                                <div className="input-field-edituser">
                                    <label className='label'>Password</label>
                                    <input
                                        type="text"
                                        id='password'
                                        name='password'
                                        value={password || ""}
                                        placeholder="Enter your password"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.password}</p>
                                </div>



                                <div className="input-field-edituser">
                                    <label className='label'>Number Phone</label>
                                    <input
                                        type="number"
                                        id='sdt'
                                        name='sdt'
                                        value={sdt || ""}
                                        placeholder="Enter your Number Phone"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>

                                <div className="input-field-edituser">
                                    <label className='label'>Status</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="user_status_id"
                                        id='user_status_id'
                                        value={user_status_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="" >-- Select Status --</option>
                                        {
                                            userstatus.map((getus, index) => (
                                                <option key={index} value={getus.id}>{getus.status_name} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-edituser">
                                    <label className='label'>Role</label>
                                    <select
                                        className="form-select"
                                        type="select"
                                        name="role_id"
                                        id='role_id'
                                        value={role_id || ""}
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected value="" >-- Select Role --</option>
                                        {
                                            usersrole.map((getrl, index) => (
                                                <option key={index} value={getrl.id}>{getrl.role_name} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">

                            <div className="buttons">
                                <Link to="/users" className="backBtn">
                                    <div className="backBtn" >
                                        <i className="uil uil-navigator"></i>
                                        <span className="btnText">Back</span>
                                    </div>
                                </Link>
                                <button className="submit" type='submit'>
                                    <span className="btnText">Submit</span>
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