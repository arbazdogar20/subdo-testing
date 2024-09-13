import {Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

// MUI
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {TableContainer} from '@mui/material';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import {PiWarningFill} from 'react-icons/pi';
import {MdOutlineUpdate} from 'react-icons/md';

const StyledTableBodyCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.body}`]: {
    borderRight: '1px solid #dee2e6',
    textAlign: 'center',
  },
}));
const StyledTableHeadCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.body}`]: {
    textAlign: 'center',
  },
}));

export default function TableDetailedRow({isOpen, weeks}) {
  const RenderIcon = (isMissedPunchIn, isMissedPunchOut, isEdited) => {
    if (isMissedPunchIn || isMissedPunchOut) {
      return <PiWarningFill color="#ffb02eff" />;
    } else if (isEdited) {
      return <MdOutlineUpdate color="var(--secondary)" />;
    } else {
      return '';
    }
  };

  return (
    <TableRow>
      <TableCell sx={{p: 0}} colSpan={12}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <TableContainer component={Paper} sx={{maxHeight: '70dvh'}}>
            <Table size="small" aria-label="purchases">
              <TableHead className={styles.tableDetailRowTableHead}>
                <TableRow className={styles.detailedTableRow}>
                  <StyledTableHeadCell sx={{minWidth: '60px'}}>
                    Week
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '30px'}}>
                    Day
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '60px'}}>
                    Date In
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '70px'}}>
                    Time In
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '60px'}}>
                    Date Out
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '70px'}}>
                    Time Out
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '60px'}}>
                    Department
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '60px'}}>
                    Type
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '60px'}}>
                    Hrs:Mins
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '60px'}}>
                    Hours
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '60px'}}>
                    Wages
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '120px'}}>
                    Ttl Tracked Hours
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '120px'}}>
                    Ttl Wages
                  </StyledTableHeadCell>
                  <StyledTableHeadCell sx={{minWidth: '120px'}}>
                    Ttl Break Hours
                  </StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weeks?.map((week) => {
                  let weekNumberRendered = false; // Initialize flag for each week
                  const weekWage =
                    week.weekWage === '-' ? '-' : `$${week.weekWage}`;
                  return (
                    <Fragment key={week.weekIdentifier}>
                      {week.days.map((day) => (
                        <Fragment key={day.date}>
                          {day.logs.map((log, logIndex) => {
                            const isMissedPunchIn = day.isMissedPunchIn;
                            const isMissedPunchOut = day.isMissedPunchOut;
                            const isEdited = day.isEdited;
                            const dayWage =
                              day.dayWage === '-' ? '-' : `$${day.dayWage}`;

                            let msg = '';
                            if (isMissedPunchIn && isMissedPunchOut)
                              msg = 'Missed Punch In & Out';
                            else if (isMissedPunchOut) msg = 'Missed Punch Out';
                            else if (isMissedPunchIn) msg = 'Missed Punch In';
                            else if (isEdited) msg = 'Record updated manually';

                            return (
                              <TableRow key={logIndex}>
                                {!weekNumberRendered && (
                                  <StyledTableBodyCell
                                    rowSpan={week.days.reduce(
                                      (acc, day) => acc + day.logs.length,
                                      0
                                    )}
                                  >
                                    {week.weekNumber}
                                    {(weekNumberRendered = true)}{' '}
                                  </StyledTableBodyCell>
                                )}
                                {logIndex === 0 && (
                                  <>
                                    <StyledTableBodyCell
                                      rowSpan={day.logs.length}
                                    >
                                      {day.day}
                                      {msg && (
                                        <Tooltip title={msg}>
                                          <IconButton size="small">
                                            {RenderIcon(
                                              isMissedPunchIn,
                                              isMissedPunchOut,
                                              isEdited
                                            )}
                                          </IconButton>
                                        </Tooltip>
                                      )}
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell
                                      rowSpan={day.logs.length}
                                    >
                                      {day.dateIn}
                                    </StyledTableBodyCell>
                                  </>
                                )}
                                <StyledTableBodyCell>
                                  {log.startTime}
                                </StyledTableBodyCell>
                                {logIndex === 0 && (
                                  <StyledTableBodyCell
                                    rowSpan={day.logs.length}
                                  >
                                    {day.dateOut}
                                  </StyledTableBodyCell>
                                )}
                                <StyledTableBodyCell>
                                  {log.endTime}
                                </StyledTableBodyCell>
                                <StyledTableBodyCell>
                                  {log.department}
                                </StyledTableBodyCell>
                                <StyledTableBodyCell>
                                  {log.status}
                                </StyledTableBodyCell>
                                <StyledTableBodyCell>
                                  {log.hoursAndMinutes}
                                </StyledTableBodyCell>
                                <StyledTableBodyCell>
                                  {log.hours}
                                </StyledTableBodyCell>
                                <StyledTableBodyCell>
                                  {log.wage}
                                </StyledTableBodyCell>
                                {logIndex === 0 && (
                                  <>
                                    <StyledTableBodyCell
                                      rowSpan={day.logs.length}
                                    >
                                      {day.dayTrackedHours}
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell
                                      rowSpan={day.logs.length}
                                    >
                                      {dayWage}
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell
                                      rowSpan={day.logs.length}
                                    >
                                      {day.dayBreakHours}
                                    </StyledTableBodyCell>
                                  </>
                                )}
                              </TableRow>
                            );
                          })}
                        </Fragment>
                      ))}
                      <TableRow
                        sx={{
                          backgroundColor: '#dee2e6',
                          borderBottom:
                            week === weeks[weeks.length - 1] &&
                            '3px solid var(--secondary)',
                        }}
                      >
                        <TableCell align="center">Wk Total</TableCell>
                        <TableCell colSpan={10}></TableCell>
                        <TableCell align="center">
                          {week.weekTotalHours}
                        </TableCell>
                        <TableCell align="center">{weekWage}</TableCell>
                        <TableCell align="center">
                          {week.weeklyBreakHours}
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

TableDetailedRow.propTypes = {
  weeks: PropTypes.object,
  isOpen: PropTypes.bool,
};
