// MUI
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSummaryBody from './tableSummaryBody';

const StyledTableHeadCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead sx={{backgroundColor: 'var(--primary)'}}>
          <TableRow sx={{color: '#fff'}}>
            <StyledTableHeadCell>Employee Name</StyledTableHeadCell>
            <StyledTableHeadCell>Employee Type</StyledTableHeadCell>
            <StyledTableHeadCell>Employee Number</StyledTableHeadCell>
            <StyledTableHeadCell>Total Worked Hours</StyledTableHeadCell>
            <StyledTableHeadCell>Total Wages</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableSummaryBody />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
