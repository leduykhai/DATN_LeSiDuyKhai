import * as React from 'react';
import axios from 'axios';

import './ListTT_Client.scss'

export default function ListCSLT() {

    const [data, setData] = React.useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3000/tintucs");
        setData(response.data);
    };

    React.useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            {data.map((item, index) => {
                return (
                    <div className='item-tt'>
                        <div className='text-tt'>
                            <h4 className='text-title-tt'>{item.tieu_de}</h4>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
