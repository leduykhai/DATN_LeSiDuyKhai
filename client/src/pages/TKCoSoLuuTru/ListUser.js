// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import "./Users.scss";
// import { toast } from 'react-toastify';
// import axios from 'axios';

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// const Users = () => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [data, setData] = useState([]);

//     const loadData = async () => {
//         const response = await axios.get("http://localhost:3000/users");
//         setData(response.data);
//     };

//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useEffect(() => {
//         loadData();
//     }, []);

//     const deleteContact = (id) => {
//         if (
//             window.confirm("Are you sure that you wanted to delete that user ?")
//         ) {
//             axios.delete(`http://localhost:3000/users/${id}`);
//             toast.success("User Delete Successfully");
//             setTimeout(() => loadData(), 100);
//         }
//     };

//     return (
//         <TableContainer component={Paper} className="table">
//             <Link to={`/addUser`}>
//                 <button className='btn btn-add'>Add User</button>
//             </Link>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell className="tableCell">No.</TableCell>
//                         <TableCell className="tableCell">ID</TableCell>
//                         <TableCell className="tableCell">Email</TableCell>
//                         <TableCell className="tableCell">Password</TableCell>
//                         <TableCell className="tableCell">Action</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {data.map((item, index) => {
//                         return (
//                             <TableRow key={item.id}>
//                                 <TableCell scope='row'>{index + 1}</TableCell>
//                                 <TableCell className="tableCell">{item.id}</TableCell>
//                                 <TableCell className="tableCell">{item.email}</TableCell>
//                                 <TableCell className="tableCell">{item.password}</TableCell>
//                                 <TableCell>
//                                     <Link to={`/updateUser/${item.id}`}>
//                                         <button className='btn btn-edit'>Edit</button>
//                                     </Link>
//                                     <button className='btn btn-delete' onClick={() => { deleteContact(item.id) }}>Delete</button>
//                                     <Link to={`/viewUser/${item.id}`}>
//                                         <button className='btn btn-view'>View</button>
//                                     </Link>
//                                 </TableCell>
//                             </TableRow>
//                         );
//                     })}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

// export default Users;
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

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GridViewIcon from '@mui/icons-material/GridView';

import stableSort from '../../components/Table/stableSort';
import getComparator from '../../components/Table/getComparator';
import EnhancedTableToolbar from '../../components/Table/EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead/EnhancedTableHead';

import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import ENDPOINT from '../../api/endpoint'

import './ListUser.scss'

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
        field: 'email',
        headerName: 'Email',
        type: 'email',
        width: 150,
    },
    {
        field: 'ho_ten',
        headerName: 'Họ Tên',
        type: 'text',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
    {
        field: 'sdt',
        headerName: 'Số Điện Thoại',
        type: 'number',
        // valueOptions: ['full time', 'part time', 'intern'],
        width: 150,
    },
];

// function createData(name, calories, fat, carbs, protein) {
//     return {
//         name,
//         calories,
//         fat,
//         carbs,
//         protein,
//     };
// }

// const rows = [
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Donut', 452, 25.0, 51, 4.9),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Honeycomb', 408, 3.2, 87, 6.5),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     createData('KitKat', 518, 26.0, 65, 7.0),
//     createData('Lollipop', 392, 0.2, 98, 0.0),
//     createData('Marshmallow', 318, 0, 81, 2.0),
//     createData('Nougat', 360, 19.0, 9, 37.0),
//     createData('Oreo', 437, 18.0, 63, 4.0),
// ];

// function descendingComparator(a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // This method is created for cross-browser compatibility, if you don't
// // need to support IE11, you can use Array.prototype.sort() directly
// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//     {
//         id: 'no',
//         numeric: false,
//         disablePadding: true,
//         label: 'No. ',
//     },
//     {
//         id: 'id',
//         numeric: false,
//         disablePadding: false,
//         label: 'ID',
//     },
//     {
//         id: 'email',
//         numeric: false,
//         disablePadding: false,
//         label: 'Email',
//     },
//     {
//         id: 'password',
//         numeric: false,
//         disablePadding: false,
//         label: 'Password',
//     },
//     {
//         id: 'status',
//         numeric: false,
//         disablePadding: false,
//         label: 'Status',
//     },
//     {
//         id: 'action',
//         numeric: false,
//         disablePadding: false,
//         label: 'Action',
//     },
// ];

// function EnhancedTableHead(props) {
//     const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//         props;
//     const createSortHandler = (property) => (event) => {
//         onRequestSort(event, property);
//     };

//     return (
//         <TableHead>
//             <TableRow>
//                 <TableCell padding="checkbox">
//                     <Checkbox
//                         color="primary"
//                         indeterminate={numSelected > 0 && numSelected < rowCount}
//                         checked={rowCount > 0 && numSelected === rowCount}
//                         onChange={onSelectAllClick}
//                         inputProps={{
//                             'aria-label': 'select all desserts',
//                         }}
//                     />
//                 </TableCell>
//                 {headCells.map((headCell) => (
//                     <TableCell
//                         key={headCell.id}
//                         align={headCell.numeric ? 'right' : 'left'}
//                         padding={headCell.disablePadding ? 'none' : 'normal'}
//                         sortDirection={orderBy === headCell.id ? order : false}
//                     >
//                         <TableSortLabel
//                             active={orderBy === headCell.id}
//                             direction={orderBy === headCell.id ? order : 'asc'}
//                             onClick={createSortHandler(headCell.id)}
//                         >
//                             {headCell.label}
//                             {orderBy === headCell.id ? (
//                                 <Box component="span" sx={visuallyHidden}>
//                                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                 </Box>
//                             ) : null}
//                         </TableSortLabel>
//                     </TableCell>
//                 ))}
//             </TableRow>
//         </TableHead>
//     );
// }

// EnhancedTableHead.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

// const EnhancedTableToolbar = (props) => {
//     const { numSelected } = props;

//     return (
//         <Toolbar
//             sx={{
//                 pl: { sm: 2 },
//                 pr: { xs: 1, sm: 1 },
//                 ...(numSelected > 0 && {
//                     bgcolor: (theme) =>
//                         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//                 }),
//             }}
//         >
//             {numSelected > 0 ? (
//                 <Typography
//                     sx={{ flex: '1 1 100%' }}
//                     color="inherit"
//                     variant="subtitle1"
//                     component="div"
//                 >
//                     {numSelected} selected
//                 </Typography>
//             ) : (
//                 <Typography
//                     sx={{ flex: '1 1 100%' }}
//                     variant="h6"
//                     id="tableTitle"
//                     component="div"
//                 >
//                     Nutrition
//                 </Typography>
//             )}

//             {numSelected > 0 ? (
//                 <Tooltip title="Delete">
//                     <IconButton>
//                         <DeleteIcon />
//                     </IconButton>
//                 </Tooltip>
//             ) : (
//                 <Tooltip title="Filter list">
//                     <IconButton>
//                         <FilterListIcon />
//                     </IconButton>
//                 </Tooltip>
//             )}
//         </Toolbar>
//     );
// };

// EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
// };

// export default function EnhancedTable() {
export default function ListUser() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const history = useHistory();

    const [userstatus, setUser_Status] = React.useState([]);

    const [data, setData] = React.useState([]);

    const loadData = async () => {
        const response = await axios.get(`http://localhost:3000/usersccslt`);
        console.log(response)
        setData(response.data);
    };

    React.useEffect(() => {
        loadData();
    }, []);

    React.useEffect(() => {
        const getuser_status = async () => {
            const resuse_status = await fetch("http://localhost:3000/userstatus");
            const resus = await resuse_status.json();
            setUser_Status(await resus);
        }
        getuser_status();
    }, []);

    const response = JSON.parse(localStorage.getItem('user'));

    const deleteContact = (id) => {
        if (response[0].role_id > 3) {
            window.alert("Tài Khoản của bạn không có quyền xoá!")
            setTimeout(() => history.goBack(), 100);
        } else {
            if (
                window.confirm("Bạn có chắc chắn muốn xoá?")
            ) {
                axios.delete(`http://localhost:3000/users/${id}`);
                toast.success("Xoá Tài Khoản Thành Công!");
                setTimeout(() => loadData(), 100);
            }
        }
    };

    // const editContact = (id) => {
    //     if (!(response[0].id)) {
    //         window.alert("Tài Khoản của bạn không có quyền Sửa!")
    //         setTimeout(() => history.goBack(), 100);
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

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <Link to={`/addUser`}>
                    <PersonAddAltIcon className='add-icon' sx={{ fontSize: 40 }} />
                </Link>
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
                                            <TableCell align="left">US{row.id}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.ho_ten}</TableCell>
                                            <TableCell align="left">
                                                <select
                                                    className="form-select"
                                                    type="select"
                                                    name="user_status_id"
                                                    id='user_status_id'
                                                    value={row.user_status_id}
                                                    disabled
                                                >
                                                    <option disabled selected value="" >-- Chọn Trạng thái --</option>
                                                    {
                                                        userstatus.map((getus, index) => (
                                                            <option key={index} value={getus.id}>{getus.status_name} </option>
                                                        ))
                                                    }
                                                </select>
                                            </TableCell>
                                            {/* <TableCell align="left">{row.user_status_id}</TableCell> */}
                                            <TableCell align="left">
                                                <Link to={`/updateUser/${row.id}`} >
                                                    <EditIcon className='edit-icon' sx={{ fontSize: 30 }} />
                                                </Link>
                                                <DeleteIcon className='delete-icon' sx={{ fontSize: 30 }} onClick={() => { deleteContact(row.id) }} />
                                                <Link to={`/viewUser/${row.id}`}>
                                                    <GridViewIcon className='view-icon' sx={{ fontSize: 30 }} />
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

