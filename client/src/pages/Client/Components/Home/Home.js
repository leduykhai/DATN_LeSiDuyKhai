import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Home.scss'

const Home = () => {

    //Cơ sở Lưu Trú
    const [data_cslt, setData_Cslt] = useState([]);

    const loadData_Cslt = async () => {
        const response = await axios.get("http://localhost:3000/cslts");
        setData_Cslt(response.data);
    };

    useEffect(() => {
        loadData_Cslt();
    }, []);

    return (
        <article className='main-home'>
            <div className='all-card-cslt'>
                {data_cslt.map((item, index) => {
                    return (
                        <div className="card-cslt">
                            <div className="card-image-cslt">
                                {/* <img src='addidas.jpg' /> */}
                            </div>
                            <div className="card-text-cslt">
                                <span className="date-cslt">{item.loai_cslt}</span>
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
    )
}

export default Home