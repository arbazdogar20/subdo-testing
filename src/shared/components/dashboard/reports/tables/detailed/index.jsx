'use client';
import styles from './styles.module.css';
import {Fragment, useState} from 'react';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// Components
import TableSingleRowData from '@/shared/components/dashboard/reports/tables/detailed/tableSingleRowData';
import PaginationComponent from '@/shared/components/pagination';
import CircularLoader from '@/shared/components/loader/circularLoader';

// Redux
import {useSelector} from 'react-redux';
import {
  getPreparedData,
  isTimeTrackingLoading,
} from '@/shared/redux/slices/timeTracking';
import styled from 'styled-components';

const StyledTableHeadCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#fff',
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: 'left',
  },
}));

export default function ReportsDetailedTable() {
  const [openRowId, setOpenRowId] = useState(null);

  const preparedData = useSelector(getPreparedData);
  const isFetching = useSelector(isTimeTrackingLoading);
  const isDataPresent = Object.keys(preparedData).length > 0;

  const handleToggleRow = (id) => {
    setOpenRowId((prevOpenRowId) => (prevOpenRowId === id ? null : id));
  };

  // Pagination
  const [itemsToShow] = useState(20);
  const [activePage, setActivePage] = useState(1);

  const startIndex = (activePage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const paginatedDataList = Object.entries(preparedData)?.slice(
    startIndex,
    endIndex
  );

  const handlePages = (_, page) => {
    setActivePage(page);
  };

  let tableBodyContent;
  if (isFetching) {
    tableBodyContent = (
      <TableRow>
        <TableCell colSpan={7} align="center">
          <CircularLoader size={70} thickness={2} />
        </TableCell>
      </TableRow>
    );
  } else if (!isDataPresent) {
    tableBodyContent = (
      <TableRow>
        <TableCell colSpan={7} align="center">
          No Data
        </TableCell>
      </TableRow>
    );
  } else {
    tableBodyContent = paginatedDataList?.map(([key, value]) => (
      <TableSingleRowData
        key={key}
        data={value}
        isOpen={openRowId === key}
        onToggle={() => handleToggleRow(key)}
      />
    ));
  }

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{backgroundColor: 'var(--primary)'}}>
              <TableCell />
              <StyledTableHeadCell>Name</StyledTableHeadCell>
              <StyledTableHeadCell>Employee No</StyledTableHeadCell>
              <StyledTableHeadCell>Designation</StyledTableHeadCell>
              <StyledTableHeadCell>Rate</StyledTableHeadCell>
              <StyledTableHeadCell>Total Tracked Hours</StyledTableHeadCell>
              <StyledTableHeadCell>Total Wages</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableBodyContent}</TableBody>
        </Table>
      </TableContainer>
      <Box className={styles.paginationContainer}>
        <PaginationComponent
          totalItems={Object.keys(preparedData).length}
          itemsToShow={itemsToShow}
          handlePages={handlePages}
        />
      </Box>
    </Fragment>
  );
}
