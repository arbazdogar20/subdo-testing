'use client';
import styles from './styles.module.css';
import {DateTime} from 'luxon';
// React hook form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// MUI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// Components
import DateRangerSelector from '@/components/selects/dateRangerSelector';
import ControlledMultipleSelectors from '@/components/selects/controlledMutipleSelector';
import ControlledSelectField from '@/components/selects/controlledSelect';
import Button from '@/components/button';
// Utils, Schemas
import {getUsersReportsSchema} from '@/shared/schemas/reports';
// Redux
import {useSelector} from 'react-redux';
import {getUsersList} from '@/shared/redux/slices/user';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import {fetchAllReports} from '@/shared/redux/slices/timeTracking';
import {getFormattedDate} from '@/shared/utils/timeUtils';
import {reportTypes} from '@/shared/constants/timeTrackingConstant';
import DownloadReportActions from './downloadReportActions';
export default function ReportsHeader() {
  const usersList = useSelector(getUsersList);
  const {onSubmitFunction, isLoading} = useSubmitFunction();

  const startDate = DateTime.now().minus({month: 1});
  const endDate = DateTime.now().minus({day: 1});

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(getUsersReportsSchema),
    defaultValues: {
      dateRange: {
        startDate: startDate.toFormat('MM-dd-yyyy'),
        endDate: endDate.toFormat('MM-dd-yyyy'),
      },
      users: [],
      type: 'detail',
    },
  });

  const reportTypeOps = Object.keys(reportTypes).map((key) => {
    return {
      label: reportTypes[key].label,
      value: reportTypes[key].value,
    };
  });

  const onSubmit = (data) => {
    const payload = {
      startDate: getFormattedDate(data?.dateRange?.startDate, 'MM-dd-yyyy'),
      endDate: getFormattedDate(data?.dateRange?.endDate, 'MM-dd-yyyy'),
      usersIds: data?.users,
      type: data?.type,
    };
    onSubmitFunction({reduxFunction: fetchAllReports, data: payload});
  };
  return (
    <div>
      <Typography className={styles.title}>Reports</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mt={1}>
          <Grid
            container
            spacing={2}
            item
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={8}
          >
            <Grid item xs={12} sm={6} md={6} lg={5} xl={4}>
              <DateRangerSelector
                disabled={isLoading}
                control={control}
                errors={errors}
                fromDate={startDate.toJSDate()}
                toDate={endDate.toJSDate()}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
              <ControlledMultipleSelectors
                disabled={isLoading}
                name="users"
                control={control}
                label="Users"
                options={usersList}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
              <ControlledSelectField
                disabled={isLoading}
                name="type"
                control={control}
                label="Report Type"
                options={reportTypeOps}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            item
            xs={12}
            sm={12}
            md={12}
            lg={4}
            xl={4}
          >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Button
                type={'submit'}
                btnText={'Generate Report'}
                loading={isLoading}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'none',
                  py: 1.8,
                  backgroundColor: 'var(--primary)',
                  '&:hover': {
                    borderColor: 'var(--primary)',
                    backgroundColor: 'var(--primary)',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <DownloadReportActions />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
