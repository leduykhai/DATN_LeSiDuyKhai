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
            if (user[key].email === email) {
                msg.email = "Email Đã Được Sử Dụng!"
            }
        }

        if (sdt.length != 10) {
            msg.sdt = "Số điện thoại không tồn tại"
        }

        if (sdt[0] != 0) {
            msg.sdt = "Số điện thoại sai!"
        }

        if (password.length < 6) {
            msg.sdt = "Mật khẩu từ 6 ký tự!"
        }

        var PhoneNumber;
        for (var i = 0; i < user.length; i++) {
            PhoneNumber = user[i].sdt;
            if (PhoneNumber === sdt) {
                msg.sdt = "Số điện thoại đã được sử dụng!"
            }
        }

        if (isEmpty(email)) {
            msg.email = "Vui lòng nhập email"
        } else if (!isEmail(email)) {
            msg.email = "Email không đúng"
        }

        if (isEmpty(password)) {
            msg.password = "Vui lòng nhập mật khẩu"
        }

        if (isEmpty(ho_ten)) {
            msg.ho_ten = "Vui lòng nhập họ tên"
        }

        if (isEmpty(sdt)) {
            msg.sdt = "Vui lòng nhập số điện thoại"
        }

        if (isEmpty(user_status_id)) {
            msg.user_status_id = "Vui lòng chọn trạng thái"
        }

        if (isEmpty(role_id)) {
            msg.role_id = "Vui lòng chọn vai trò"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !ho_ten || !sdt || !user_status_id || !role_id) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (!id) {
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
                toast.success("Đăng ký thành công")
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
            <div className="container-adduser">
                <header className='header'>Thêm tài khoản</header>

                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="form-adduser first-adduser">
                        <div className="details personal">
                            <span className="title-adduser">Thông tin tài khoản</span>

                            <div className="fields-adduser">

                                <div className="input-field-adduser">
                                    <label className='label'>Họ Tên</label>
                                    <input
                                        type="text"
                                        id='ho_ten'
                                        name='ho_ten'
                                        value={ho_ten || ""}
                                        placeholder="Nhập họ tên. . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.ho_ten}</p>
                                </div>

                                <div className="input-field-adduser">
                                    <label className='label'>Email</label>
                                    <input
                                        type="email"
                                        id='email'
                                        name='email'
                                        value={email || ""}
                                        placeholder="Nhập Email . . . "
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.email}</p>
                                </div>

                                <div className="input-field-adduser">
                                    <label className='label'>Mât Khẩu</label>
                                    <input
                                        type="text"
                                        id='password'
                                        name='password'
                                        value={password || ""}
                                        placeholder="Nhập Mật Khẩu . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.password}</p>
                                </div>



                                <div className="input-field-adduser">
                                    <label className='label'>Số Điện Thoại</label>
                                    <input
                                        type="number"
                                        id='sdt'
                                        name='sdt'
                                        value={sdt || ""}
                                        placeholder="Nhập Số Điện Thoại . . ."
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <p className="error-text">{validationMsg.sdt}</p>
                                </div>

                                <div className="input-field-adduser">
                                    <label className='label'>Trạng Thái</label>
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
                                        <option disabled selected value="" >-- Chọn Trạng Thái --</option>
                                        {
                                            userstatus.map((getus, index) => (
                                                <option key={index} value={getus.id}>{getus.status_name} </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="input-field-adduser">
                                    <label className='label'>vai Trò</label>
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
                                        <option disabled selected value="" >-- Chọn vai trò --</option>
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
                                        <span className="btnText">Quay Lại</span>
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