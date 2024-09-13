import CircularLoader from '@/shared/components/loader/circularLoader';
import {
  getSummaryReportPreparedData,
  isTimeTrackingLoading,
} from '@/shared/redux/slices/timeTracking';
import {TableRow} from '@mui/material';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import {Fragment} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

const StyledTablTotalCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}));

export default function TableSummaryBody() {
  const data = useSelector(getSummaryReportPreparedData);
  const isFetching = useSelector(isTimeTrackingLoading);

  const isDataPresent = Object.keys(data).length > 0;

  if (isFetching) {
    return (
      <TableRow>
        <TableCell colSpan={5} align="center">
          <CircularLoader size={70} thickness={2} />
        </TableCell>
      </TableRow>
    );
  } else if (!isDataPresent) {
    return (
      <TableRow>
        <TableCell colSpan={5} align="center">
          No data available
        </TableCell>
      </TableRow>
    );
  } else {
    return (
      <Fragment>
        {data?.users?.map((item) => (
          <TableRow key={item.employeeNumber}>
            <TableCell component="th" scope="row">
              {item.employeeName}
            </TableCell>
            <TableCell>{item.employeeType}</TableCell>
            <TableCell>{item.employeeNumber}</TableCell>
            <TableCell>{item.totalHoursWorked}</TableCell>
            <TableCell>${item.totalWages}</TableCell>
          </TableRow>
        ))}
        <TableRow sx={{backgroundColor: '#F276491A'}}>
          <StyledTablTotalCell component="th" scope="row" colSpan={3}>
            Total
          </StyledTablTotalCell>
          <StyledTablTotalCell>{data?.totalHoursWorked}</StyledTablTotalCell>
          <StyledTablTotalCell>${data?.totalWages}</StyledTablTotalCell>
        </TableRow>
      </Fragment>
    );
  }
}
