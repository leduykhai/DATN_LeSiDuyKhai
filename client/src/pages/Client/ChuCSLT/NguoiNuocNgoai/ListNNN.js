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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GridViewIcon from '@mui/icons-material/GridView';

import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import './ListNNN.scss'
// import Moment from 'react-moment';

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
        field: 'ho_ten',
        headerName: 'Họ Tên',
        type: 'text',
        width: 150,
    },
    {
        field: 'ngay_sinh',
        headerName: 'Ngày Sinh',
        type: 'text',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
    {
        field: 'gioi_tinh',
        headerName: 'Giới Tính',
        type: 'text',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'text',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
    {
        field: 'so_ho_chieu',
        headerName: 'Số Hộ Chiếu',
        type: 'text',
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
    {
        field: 'sdt',
        headerName: 'Số điện thoại',
        type: 'text',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
    {
        field: 'ngay_dang_ky',
        headerName: 'Ngày Đăng Ký',
        type: 'text',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },

];

export default function ListNNN_Client() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [data, setData] = React.useState([]);

    const history = useHistory();

    const { id } = useParams();

    const loadData = async () => {
        const response = await axios.get(`http://localhost:3000/nguoinuocngoaiscslt/${id}`);
        setData(response.data);
    };

    React.useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if (
            window.confirm("Bạn chắc chắn muốn xoá người nước ngoài này ?")
        ) {
            axios.delete(`http://localhost:3000/nguoinuocngoais/${id}`);
            toast.success("Xoá Thành Công!");
            setTimeout(() => loadData(), 100);
        }
    };


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
                <ArrowCircleLeftIcon className='add-icon' sx={{ fontSize: 50 }} onClick={handleBack} />
                {/* <div style={{ height: 300, width: '100%' }}> */}
                <DataGridPremium
                    rows={data}
                    columns={columns}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
                {/* </div> */}
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
                                            <TableCell align="left">NNN{row.id}</TableCell>
                                            <TableCell align="left">{row.ho_ten}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.so_ho_chieu}</TableCell>
                                            <TableCell align="left">
                                                <Link to={`/editnnn/${row.id}`}>
                                                    <EditIcon className='edit-icon' sx={{ fontSize: 30 }} />
                                                </Link>
                                                <Link to={`/list_lt/${row.id}`}>
                                                    <GridViewIcon className='view-icon' sx={{ fontSize: 30 }} />
                                                </Link>
                                                <Link to={`/add_lt/${row.id}`}>
                                                    {/* <OtherHousesOutlinedIcon className='add-icon' sx={{ fontSize: 40 }} /> */}
                                                    <AddOutlinedIcon className='add-icon' sx={{ fontSize: 30 }} />
                                                </Link>
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
