'use client';
// MUI
import Box from '@mui/material/Box';

// Components
import ReportsDetailedTable from '@/components/dashboard/reports/tables/detailed';
import ReportSummaryTable from '@/components/dashboard/reports/tables/summary';

// Others
import {reportTypes} from '@/shared/constants/timeTrackingConstant';

// Redux
import {useSelector} from 'react-redux';
import {getSelectedReportType} from '@/redux/slices/timeTracking';

export default function ReportTables() {
  const selectedReportType = useSelector(getSelectedReportType);
  return (
    <Box sx={{mt: 2.4}}>
      {selectedReportType === reportTypes.summary.value ? (
        <ReportSummaryTable />
      ) : (
        <ReportsDetailedTable />
      )}
    </Box>
  );
}
