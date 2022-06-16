import * as React from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GridViewIcon from '@mui/icons-material/GridView';

import stableSort from '../../../components/Table/stableSort';
import getComparator from '../../../components/Table/getComparator';
// import EnhancedTableToolbar from '../../components/Table/EnhancedTableToolbar';
// import EnhancedTableHead from './EnhancedTableHead/EnhancedTableHead';

import './ListCSLT_Client.scss'
import { Link } from 'react-router-dom';

export default function ListCSLT_Client() {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);

    const [data, setData] = React.useState([]);

    const [searchTerm, setSearchTerm] = React.useState('');

    const [datadg, setDataDg] = React.useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:3000/cslts");
        setData(response.data);
    };

    React.useEffect(() => {
        loadData();
    }, []);



    const loadDataDg = async () => {
        const response = await axios.get(`http://localhost:3000/danhgiascslt/${data[0].id}`);
        setDataDg(response.data);
    };

    React.useEffect(() => {
        loadDataDg();
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty data.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    return (
        <article className='main-home'>
            <div className="search_client">
                <input
                    className='label-search'
                    type="text"
                    placeholder='Tìm Kiếm . . .'
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }}
                />
            </div>
            <div className='all-card-cslt'>
                {stableSort(data, getComparator(order, orderBy))
                    .filter((item) => {
                        if (searchTerm == "") {
                            return item
                        } else if (item.ten_cslt.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return item
                        } else if (item.loai_cslt.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return item
                        }
                    })
                    // stableSort(data, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
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
                                    <Link className="type-cslt" to={`/client_kbt/${item.id}`}>
                                        <div className="stat-cslt">
                                            <div className="value-cslt"><sup></sup></div>
                                            <div className="type-cslt size-type">Khai báo Lưu trú ở đây</div>
                                        </div>
                                    </Link>
                                    <Link className="type-cslt" to={`/client_ctcslt/${item.id}`}>
                                        <div className="stat-cslt border-cslt">
                                            <div className="value-cslt">123</div>
                                            <div className="type-cslt">Lượt Xem</div>
                                        </div>
                                    </Link>
                                    <Link className="type-cslt" to={`/client_ctcslt/${item.id}`}>
                                        <div className="stat-cslt">
                                            <div className="value-cslt">{datadg.length}</div>
                                            <div className="type-cslt">Bình Luận</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <TablePagination
                // style={jus}
                rowsPerPageOptions={[6, 12, 18]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </article>
    );
}
