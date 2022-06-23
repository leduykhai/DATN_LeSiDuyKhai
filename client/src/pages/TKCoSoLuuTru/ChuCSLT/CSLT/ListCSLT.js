import * as React from 'react';
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

import stableSort from '../../../../components/Table/stableSort';
import getComparator from '../../../../components/Table/getComparator';
import EnhancedTableToolbar from '../../../../components/Table/EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead/EnhancedTableHead';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GridViewIcon from '@mui/icons-material/GridView';

import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import './ListCSLT.scss'

import {
    DataGridPremium,
    GridToolbarContainer,
    GridToolbarExport,
} from '@mui/x-data-grid-premium';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    {
        field: 'chu_cslt_id',
        headerName: 'Chủ cơ sở lưu trú ID',
        type: 'number',
        width: 150,
    },
    {
        field: 'phuong_id',
        headerName: 'Phường ID',
        type: 'number',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
    {
        field: 'ten_cslt',
        headerName: 'Tên Cơ sở Lưu Trú',
        type: 'text',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
    {
        field: 'loai_cslt',
        headerName: 'Loại Cơ sở Lưu Trú',
        type: 'text',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
    {
        field: 'nguoi_dai_dien',
        headerName: 'Người Đại diện',
        type: 'text',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
    {
        field: 'sdt',
        headerName: 'Số điện thoại',
        type: 'number',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'email',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
    {
        field: 'dia_chi',
        headerName: 'Địa Chỉ',
        type: 'text',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },

];

export default function ListCSLT() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [data, setData] = React.useState([]);

    const [searchTerm, setSearchTerm] = React.useState('');

    const { id } = useParams();

    const history = useHistory();

    const loadData = async () => {
        // const responses = JSON.parse(localStorage.getItem('user'));
        // const id = responses[0].id;
        const response = await axios.get(`http://localhost:3000/ccslts/${id}`);
        // localStorage.setItem("nhanvien", JSON.stringify(response.data))
        setData(response.data);
    };

    React.useEffect(() => {
        loadData();
    }, []);


    // const loadData = async () => {
    //     const responses = JSON.parse(localStorage.getItem('user'));
    //     const id = responses[0].id;
    //     if (id === 1) {
    //         const response = await axios.get(`http://localhost:3000/cslts`);
    //         setData(response.data);
    //     } else {
    //         const responses = JSON.parse(localStorage.getItem('nhanvien'));
    //         const id = responses[0].khuvuc_id;
    //         console.log(id)
    //         const response = await axios.get(`http://localhost:3000/csltsphuong/${id}`);
    //         setData(response.data);
    //     }
    // };

    // React.useEffect(() => {
    //     loadData();
    // }, []);

    // const deleteContact = (id) => {
    //     if (
    //         window.confirm("Bạn chắc chắn muốn xoá cơ sở lưu trú này ?")
    //     ) {
    //         axios.delete(`http://localhost:3000/cslts/${id}`);
    //         toast.success("Xoá Thành Công!");
    //         setTimeout(() => loadData(), 100);
    //     }
    // };


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

    const handleBack = (e) => {
        setTimeout(() => history.goBack(), 100);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                {/* <Link to={`/addcslt`}>
                    <MapsHomeWorkOutlinedIcon className='add-icon' sx={{ fontSize: 40 }} />
                    <AddOutlinedIcon className='add-icon' sx={{ fontSize: 40 }} />
                </Link> */}
                {/* <div style={{ height: 300, width: '100%' }}> */}
                {/* <DataGridPremium
                    rows={data}
                    columns={columns}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                /> */}
                {/* </div> */}
                {/* <div className="search_user">
                    <input
                        className='label-search_user'
                        type="text"
                        placeholder='Tìm Kiếm . . .'
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }}
                    />
                    <i className="fas fa-search" id="search-icon"></i>
                </div> */}
                <ArrowCircleLeftIcon className='add-icon' sx={{ fontSize: 50 }} onClick={handleBack} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 data.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(data, getComparator(order, orderBy))
                                .filter((item) => {
                                    if (searchTerm == "") {
                                        return item
                                    } else if (item.ten_cslt.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return item
                                    } else if (item.nguoi_dai_dien.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return item
                                    } else if (item.loai_cslt.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return item
                                    }
                                })
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {/* {row.name} */}
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="left">CSLT{row.id}</TableCell>
                                            <TableCell align="left">CCSLT{row.chu_cslt_id}</TableCell>
                                            <TableCell align="left">{row.ten_cslt}</TableCell>
                                            <TableCell align="left">{row.loai_cslt}</TableCell>
                                            <TableCell align="left">{row.nguoi_dai_dien}</TableCell>
                                            <TableCell align="left">
                                                <Link to={`/edit_cslt/${row.id}`}>
                                                    <EditIcon className='edit-icon' sx={{ fontSize: 30 }} />
                                                </Link>
                                                {/* <DeleteIcon className='delete-icon' sx={{ fontSize: 30 }} onClick={() => { deleteContact(row.id) }} /> */}
                                                {/* <Link to={`/edit_gt/${row.id}`}>
                                                    <GridViewIcon className='view-icon' sx={{ fontSize: 30 }} />
                                                </Link> */}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Thu Gọn"
            />
        </Box>
    );
}
