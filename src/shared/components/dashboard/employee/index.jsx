'use client';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {DateTime} from 'luxon';

// Components
import Button from '@/components/button';
import DownloadReportActions from '@/components/dashboard/reports/downloadReportActions';
import DateRangerSelector from '@/components/selects/dateRangerSelector';
import ReportTables from '@/components/dashboard/reports/tables/detailed/index';

// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Hooks, constants , utils and others
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import {getSingleUserReportSchema} from '@/shared/schemas/reports';
import {getFormattedDate} from '@/shared/utils/timeUtils';

// Redux
import {fetchLoggedInUserReports} from '@/shared/redux/slices/timeTracking';

export default function EmployeeDashboard() {
  const {isLoading, onSubmitFunction} = useSubmitFunction();

  const startDate = DateTime.now().minus({month: 1});
  const endDate = DateTime.now().minus({day: 1});

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(getSingleUserReportSchema),
    defaultValues: {
      dateRange: {
        startDate: startDate.toFormat('MM-dd-yyyy'),
        endDate: endDate.toFormat('MM-dd-yyyy'),
      },
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      startDate: getFormattedDate(data?.dateRange?.startDate, 'MM-dd-yyyy'),
      endDate: getFormattedDate(data?.dateRange?.endDate, 'MM-dd-yyyy'),
    };
    onSubmitFunction({
      reduxFunction: fetchLoggedInUserReports,
      data: payload,
    });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{my: 2, fontWeight: 'bold'}}>
        Welcome Back👋
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: '20px'}}>
        <Grid container spacing={2} justifyContent={'space-between'}>
          <Grid container item xs={12} sm={12} md={6} lg={7} xl={7}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <DateRangerSelector
                control={control}
                errors={errors}
                disabled={isLoading}
                fromDate={startDate.toJSDate()}
                toDate={endDate.toJSDate()}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Grid item xs={12} sm={6} md={6} lg={7} xl={7}>
              <Button
                btnText={'Generate Report'}
                type={'submit'}
                sx={{
                  backgroundColor: 'var(--primary)',
                  textTransform: 'none',
                  p: 1.55,
                  fontSize: '16px',
                  '&:hover': {
                    backgroundColor: 'var(--primary)',
                  },
                }}
                loading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5} xl={5}>
              <DownloadReportActions />
            </Grid>
          </Grid>
        </Grid>
      </form>
      <ReportTables />
    </Box>
  );
}
