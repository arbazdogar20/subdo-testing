import {Fragment, useRef} from 'react';
import PropTypes from 'prop-types';

// MUI
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {IoMdArrowDropup, IoMdArrowDropdown} from 'react-icons/io';

// Components
import TableDetailedRow from '@/components/dashboard/reports/tables/detailed/tableDetailedRow';

const TableSingleRowData = ({data, isOpen, onToggle}) => {
  const {
    employeeName,
    employeeId,
    designation,
    hourlyRate,
    totalTrackedHours,
    totalWageOfEmployee,
  } = data;

  const rowRef = useRef(null);

  const handleToggle = () => {
    onToggle();
    rowRef.current.scrollIntoView({behavior: 'smooth', block: 'end'});
  };

  return (
    <Fragment>
      <TableRow ref={rowRef} sx={{backgroundColor: isOpen ? '#F276491A' : ''}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleToggle}
          >
            {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {employeeName}
        </TableCell>
        <TableCell align="left">{employeeId}</TableCell>
        <TableCell align="left">{designation}</TableCell>
        <TableCell align="left">${hourlyRate}</TableCell>
        <TableCell align="left">{totalTrackedHours}</TableCell>
        <TableCell align="left">${totalWageOfEmployee}</TableCell>
      </TableRow>
      {<TableDetailedRow isOpen={isOpen} weeks={data.weeks} />}
    </Fragment>
  );
};

TableSingleRowData.propTypes = {
  data: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TableSingleRowData;
