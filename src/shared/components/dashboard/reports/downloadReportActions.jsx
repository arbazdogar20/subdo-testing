import {Fragment, useState} from 'react';
import {useSelector} from 'react-redux';

// Icons
import {BsFileEarmarkExcel, BsFillFilePdfFill} from 'react-icons/bs';
import {IoCloudDownloadOutline} from 'react-icons/io5';
import IconButtonWithMenu from '@/components/button/IconButtonWithMenu';

// Utils
import {generateDetailedPdfReport} from '@/shared/utils/generateDetailedPdfReport';
import {generateSummaryPdfReport} from '@/shared/utils/generateSummaryPdfReport';
import {reportTypes} from '@/shared/constants/timeTrackingConstant';

// Redux
import {
  getPreparedData,
  getReportDateRange,
  getSelectedReportType,
  getSummaryReportPreparedData,
} from '@/shared/redux/slices/timeTracking';
import {Snackbar} from '@mui/material';
import {generateDetailedExcelReport} from '@/shared/utils/generateDetailedExcelReport';
import {generateSummaryExcelReport} from '@/shared/utils/generateSummaryExcelReport';

export default function DownloadReportActions() {
  const employeesReportsData = useSelector(getPreparedData);
  const summaryReportPreparedData = useSelector(getSummaryReportPreparedData);
  const {startDate, endDate} = useSelector(getReportDateRange);
  const selectedUserReportType = useSelector(getSelectedReportType);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleGeneratePdf = () => {
    setShowSnackbar(true);
    if (selectedUserReportType === reportTypes.detail.value) {
      generateDetailedPdfReport(employeesReportsData, startDate, endDate);
    } else {
      generateSummaryPdfReport(summaryReportPreparedData, startDate, endDate);
    }
  };

  const handleGenerateExcel = () => {
    setShowSnackbar(true);
    if (selectedUserReportType === reportTypes.detail.value) {
      generateDetailedExcelReport(employeesReportsData, startDate, endDate);
    } else {
      generateSummaryExcelReport(summaryReportPreparedData, startDate, endDate);
    }
  };

  const isDataAvailable =
    Object.keys(summaryReportPreparedData).length !== 0 ||
    Object.keys(employeesReportsData).length !== 0;

  return (
    <Fragment>
      <IconButtonWithMenu
        sx={{
          color: 'black',
          borderColor: 'var(--primary)',
          textTransform: 'capitalize',
          borderRadius: '5px',
          width: '100%',
          padding: '14px',
          '&:hover': {
            backgroundColor: '#fef4f1ff',
            borderColor: 'var(--primary)',
          },
        }}
        btnText="Export"
        disabled={!isDataAvailable}
        hasButtonMenu={true}
        icon={IoCloudDownloadOutline}
        buttonMenuList={[
          {
            id: 1,
            icon: <BsFillFilePdfFill />,
            title: 'PDF',
            method: handleGeneratePdf,
          },
          {
            id: 2,
            icon: <BsFileEarmarkExcel />,
            title: 'XLSX',
            method: handleGenerateExcel,
          },
        ]}
        variant="outlined"
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Your report is being prepared and will start downloading shortly."
      />
    </Fragment>
  );
}
