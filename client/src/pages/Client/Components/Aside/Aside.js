import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Aside = () => {

    // Tin Tức
    const [data_tt, setData_Tt] = useState([]);

    const loadData_Tt = async () => {
        const response = await axios.get("http://localhost:3000/tintucs");
        setData_Tt(response.data);
    };

    useEffect(() => {
        loadData_Tt();
    }, []);
    return (

        <aside className='aside-home aside2-home'>
            <h1 className='news'>Tin Tức</h1>
            {data_tt.map((item, index) => {
                return (
                    <div className='item-tt'>
                        <div className='text-tt'>
                            <h4 className='text-title-tt'>{item.tieu_de}</h4>
                            <p className='text-content-tt'>{item.noi_dung}</p>
                        </div>
                    </div>
                );
            })}
        </aside>

    )
}

export default Aside