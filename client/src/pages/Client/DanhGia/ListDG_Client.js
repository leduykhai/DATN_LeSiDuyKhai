import * as React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import isEmpty from "validator/lib/isEmpty";


import './ListDG_Client.scss'
import { useHistory, useParams } from 'react-router-dom';

const initialState = {
    cslt_id: "",
    nnn_id: "",
    noi_dung: ""
}

export default function ListDG_Client() {

    const [state, setState] = React.useState(initialState);

    const { cslt_id, nnn_id, noi_dung } = state;

    const [validationMsg, setValidationMsg] = React.useState({})

    const history = useHistory();

    const [nnn, setNnn] = React.useState([]);

    const [cslt, setCslt] = React.useState([]);

    const [data, setData] = React.useState([]);

    const { id } = useParams();

    const response = JSON.parse(localStorage.getItem('user'));


    const loadData = async () => {
        const response = await axios.get(`http://localhost:3000/danhgiascslt/${id}`);
        setData(response.data);
    };

    React.useEffect(() => {
        loadData();
    }, []);

    //nguoi nuoc ngoai
    React.useEffect(() => {
        const getNNN = async () => {
            const resnnn = await fetch(`http://localhost:3000/nguoinuocngoais`);
            const resn = await resnnn.json();
            setNnn(await resn);
        }
        getNNN();
    }, []);

    //co so luu tru
    React.useEffect(() => {
        const getcslt = async () => {
            const rescslt = await fetch(`http://localhost:3000/cslts/${id}`);
            const resc = await rescslt.json();
            setCslt(await resc);
        }
        getcslt();
    }, []);

    const validateAll = () => {
        const msg = {}

        if (isEmpty(noi_dung)) {
            msg.noi_dung = "Vui lòng nhập nội dung"
        }

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!noi_dung) {
            toast.error("Vui lòng nhập bình luận!");
        }
        const isValid = validateAll()
        if (!isValid) return
        else {
            if (id) {

                var cslt_id = id;
                var nnn_id = response[0].id;
                axios
                    .post("http://localhost:3000/danhgias", {
                        cslt_id,
                        nnn_id,
                        noi_dung
                    })
                    .then(() => {
                        setState({
                            cslt_id: "",
                            nnn_id: "",
                            noi_dung: "",
                        });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Cảm Ơn Bạn Đã Bình Luận!")
            }
            setTimeout(() => loadData(), 100);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <aside className='aside-home aside2-home'>
            <div className="container-adddg-cl">
                <h1 className='news'>Bình luận</h1>
                <form className='form-all' onSubmit={handleSubmit}>
                    <div className="fields-adddg-cl">
                        <div className="input-field-adddg-cl">
                            <input
                                className='input-content-bl'
                                type="text"
                                id='noi_dung'
                                name='noi_dung'
                                value={noi_dung || ""}
                                placeholder="Nhập bình luận..."
                                required
                                onChange={handleInputChange}
                            />
                            <p className="error-text">{validationMsg.noi_dung}</p>
                        </div>
                    </div>
                    {data.map((item, index) => {
                        return (
                            <div className='item-dg-cl'>
                                <div className='text-dg-cl'>
                                    <h4 className='text-title-dg-cl'>Ma_NNN_{item.nnn_id}</h4>
                                    <p className='text-content-dg-cl'>{item.noi_dung}</p>
                                </div>
                            </div>
                            // <div className='item-dg-cl'>
                            //     <div className=''>
                            //         <div >
                            //             <select
                            //                 className='nnn-bl'
                            //                 type="select"
                            //                 name="nnn_id"
                            //                 id='nnn_id'
                            //                 value={nnn_id}
                            //                 disabled
                            //             >
                            //                 {
                            //                     nnn.map((getrl, index) => (
                            //                         <option key={index} value={getrl.id}>{getrl.ho_ten} </option>
                            //                     ))
                            //                 }
                            //             </select>
                            //         </div>
                            //         <p className='text-content-dg-cl'>{item.noi_dung}</p>
                            //     </div>
                            // </div>
                        );
                    })}
                </form>
            </div>
        </aside>
    );
}
