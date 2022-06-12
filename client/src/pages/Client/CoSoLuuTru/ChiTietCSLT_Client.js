import * as React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListDG_Client from '../DanhGia/ListDG_Client';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import './ChiTietCSLT_Client.scss'

export default function ChiTietCSLT_Client() {

    const [data, setData] = React.useState([]);

    const [cslt, setCslt] = React.useState([]);

    const { id } = useParams();

    const [value, setValue] = React.useState(4);


    const loadData = async () => {
        const response = await axios.get(`http://localhost:3000/ct_cslts/${id}`);
        setData(response.data);
    };

    React.useEffect(() => {
        loadData();
    }, []);

    //CSLT
    React.useEffect(() => {
        const getCslt = async () => {
            const rescslt = await fetch(`http://localhost:3000/cslts/${id}`);
            const resc = await rescslt.json();
            setCslt(await resc);
        }
        getCslt();
    }, []);

    return (
        <>
            <article className='main-home main-ct-cslt'>
                {cslt.map((item, index) => {
                    return (
                        <h1 className='ten-cslt'>{item.ten_cslt}</h1>
                    );
                })}
                {data.map((item, index) => {
                    return (
                        <div className='item-tt'>
                            <div className='text-tt'>
                                <p className='text-title-tt'>Giới Thiệu</p>
                                <p className=''>{item.gioi_thieu}</p>
                                <Box
                                    sx={{
                                        '& > legend': { mt: 4 },
                                    }}
                                >
                                    <Typography component="legend">Đánh Giá</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                                <br />
                                <p className='text-content-ct-cl'>
                                    Chỗ nghỉ này cách bãi biển 1 phút đi bộ. Tọa lạc tại thành phố Đà Nẵng, cách Cầu tàu Tình yêu 3 km, Halina Hotel and Apartment cung cấp chỗ nghỉ bên bờ biển với nhiều tiện nghi như hồ bơi ngoài trời, phòng xông hơi khô, trung tâm thể dục và quầy bar. Trong số các tiện nghi tại khách sạn này còn có nhà hàng, lễ tân 24 giờ, dịch vụ phòng và WiFi miễn phí. Chỗ nghỉ cũng có sảnh khách chung, trung tâm dịch vụ doanh nhân và dịch vụ thu đổi ngoại tệ cho khách.
                                </p>
                                <br />
                                <p className='text-content-ct-cl'>
                                    Phòng nghỉ của Halina Hotel and Apartment được trang bị khu vực ghế ngồi, bàn làm việc, TV màn hình phẳng và phòng tắm riêng.
                                </p>
                                <br />
                                <p className='text-content-ct-cl'>
                                    Halina Hotel and Apartment nằm cách Bảo tàng Chăm 3,6 km và Cầu Sông Hàn 4,2 km. Sân bay gần nhất là sân bay quốc tế Đà Nẵng, cách đó 6 km, và khách sạn cung cấp dịch vụ đưa đón sân bay với một khoản phụ phí.
                                </p>
                                <br />
                                <br />
                                <div className="card-image-ctcslt">
                                    <img src='' alt='' />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </article>
            <ListDG_Client />
        </>
    );
}
