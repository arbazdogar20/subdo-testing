'use client';
import {useMemo} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {getUsersList} from '@/shared/redux/slices/user';
import ControlledSearchAbleSelectField from '@/components/selects/controlledSearchAbleSelectField';
import ControlledDateSelector from '@/components/selects/controlledDateSelector';
import Button from '@/shared/components/button';
import {yupResolver} from '@hookform/resolvers/yup';
import {modifyReportsSchema} from '@/shared/schemas/reports';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import {modifyEntries} from '@/shared/redux/slices/timeTracking';
import EntriesComponent from '@/components/dashboard/manager/modifyEntries/entriesComponent';
import {getFormattedDate} from '@/shared/utils/timeUtils';

export default function ModifyEntries() {
  const usersList = useSelector(getUsersList);
  const {onSubmitFunction, isLoading} = useSubmitFunction();

  const userOpts = useMemo(() => {
    return usersList.map((user) => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user.id,
    }));
  }, [usersList]);

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(modifyReportsSchema),
    defaultValues: {
      logs: [{startTime: '', endTime: '', departmentId: null, status: ''}],
    },
  });

  const onSubmit = (data) => {
    const userId = data.userId.value;
    const date = getFormattedDate(data.date, 'yyyy-MM-dd');
    const logs = data.logs;
    const preparedLogs = [];
    for (const log of logs) {
      preparedLogs.push({
        startTime: log.startTime,
        endTime: log.endTime,
        departmentId: log.departmentId.value,
        status: log.status,
      });
    }
    const payload = {userId, date, logs: preparedLogs};
    onSubmitFunction({
      reduxFunction: modifyEntries,
      data: payload,
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Box>
      <Typography
        color="var(--secondary)"
        mb={2}
        fontWeight="bold"
        fontSize="x-large"
      >
        Modfiy Time
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{marginTop: '10px 0'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ControlledSearchAbleSelectField
              options={userOpts}
              label="Employee"
              name="userId"
              control={control}
              errors={errors}
              getOptionLabel={(option) => option.label}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledDateSelector
              control={control}
              errors={errors}
              name="date"
              label="Date"
            />
          </Grid>
        </Grid>
        <Typography
          color="var(--secondary)"
          my={2}
          fontWeight="500"
          fontSize="x-large"
        >
          Entries
        </Typography>

        <EntriesComponent
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />

        <Button
          sx={{
            mt: 2,
            maxWidth: '200px',
            py: 1.8,
            float: 'right',
            textTransform: 'none',
            backgroundColor: 'var(--primary)',
            '&:hover': {backgroundColor: 'var(--primary)'},
          }}
          loading={isLoading}
          type="submit"
          btnText="Save"
        />
      </form>
    </Box>
  );
}
