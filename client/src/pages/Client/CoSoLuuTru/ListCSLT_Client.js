import * as React from 'react';
import axios from 'axios';

import './ListCSLT_Client.scss'

export default function ListCSLT_Client() {

    const [data, setData] = React.useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3000/cslts");
        setData(response.data);
    };

    React.useEffect(() => {
        loadData();
    }, []);

    return (
        <article className='main-home'>
            <div className='all-card-cslt'>
                {data.map((item, index) => {
                    return (
                        <div className="card-cslt">
                            <div className="card-image-cslt">
                                <img src='' alt='' />
                            </div>
                            <div className="card-text-cslt">
                                <span className="loai-cslt">{item.loai_cslt}</span>
                                <h2 className='title-cslt'>{item.ten_cslt}</h2>
                                {/* <p className='about-cslt'>Lorem ipsum dolor sit amet consectetur, Ducimus, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor</p> */}
                            </div>
                            <div className="card-stats-cslt">
                                <div className="stat-cslt">
                                    <div className="value-cslt">4<sup>m</sup></div>
                                    <div className="type-cslt">read</div>
                                </div>
                                <div className="stat-cslt border-cslt">
                                    <div className="value-cslt">5123</div>
                                    <div className="type-cslt">views</div>
                                </div>
                                <div className="stat-cslt">
                                    <div className="value-cslt">32</div>
                                    <div className="type-cslt">comments</div>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
        </article>
    );
}