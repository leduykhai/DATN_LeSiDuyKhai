import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import PropTypes from 'prop-types';


const headCells = [
    {
        id: 'no',
        numeric: false,
        disablePadding: true,
        label: 'STT',
    },
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'ID',
    },
    {
        id: 'nnn_id',
        numeric: false,
        disablePadding: false,
        label: 'ID Người Nước Ngoài',
    },
    {
        id: 'cslt_id',
        numeric: false,
        disablePadding: false,
        label: 'ID Cơ Sở Lưu Trú',
    },
    {
        id: 'ngay_dang_ky_lt',
        numeric: false,
        disablePadding: false,
        label: 'Ngày Đăng Ký Lưu Trú',
    },
    {
        id: 'ngay_den_lt',
        numeric: false,
        disablePadding: false,
        label: 'Ngày Đến Lưu Trú',
    },
    {
        id: 'luutru_status_id',
        numeric: false,
        disablePadding: false,
        label: 'Trạng thái',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Hành Động',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead
