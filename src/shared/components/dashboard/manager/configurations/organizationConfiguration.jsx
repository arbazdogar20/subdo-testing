'use client';
import styles from './styles.module.css';

import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

// MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Componenets
import Button from '@/components/button';
import TimePicker from '@/components/dashboard/timePicker';
import ControlledTextInput from '@/components/inputs/controlledTextInput';
import ControlledSelectField from '@/components/selects/controlledSelect';

// Constants, Schemas, Hooks
import useSubmitFunction from '@/hooks/useSubmitFunction';
import {organizationConfigurationSchema} from '@/schemas/organization';
import {trackingModes} from '@/constants/timeTrackingConstant';

// Redux
import {useSelector} from 'react-redux';
import {
  getCurrentOrganization,
  updateOrganizations,
} from '@/redux/slices/organization';

export default function OrganizationConfiguration() {
  const {isLoading, onSubmitFunction} = useSubmitFunction();
  const currentOrganization = useSelector(getCurrentOrganization);

  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(organizationConfigurationSchema),
    defaultValues: {
      name: currentOrganization?.name || '',
      cutOffTime: currentOrganization?.cutOffTime || '0',
      trackingMode: currentOrganization?.trackingMode || '',
    },
  });

  const values = watch();

  const onSubmit = async (data) => {
    let {name, cutOffTime} = data;

    onSubmitFunction({
      reduxFunction: updateOrganizations,
      data: {
        name,
        cutOffTime,
        organizationId: currentOrganization?.id,
        trackingMode: data.trackingMode,
      },
      onSuccess: () => {},
    });
  };

  const trackingModesArr = Object.values(trackingModes).map((item) => ({
    label: item.label,
    value: item.value,
  }));

  const handleTimeChange = (selectedTime) => {
    const totalMinutes = selectedTime?.c?.hour * 60 + selectedTime?.c?.minute;
    setValue('cutOffTime', totalMinutes.toString());
  };

  return (
    <Box>
      <Typography className={styles.main_container}>
        Manage Organization
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ControlledTextInput
              name={'name'}
              label="Name"
              error={errors}
              placeholder="Enter name"
              control={control}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledSelectField
              name={'trackingMode'}
              control={control}
              label={'Tracking Mode'}
              options={trackingModesArr}
              errors={errors}
            />
            <Typography
              color="var(--secondary)"
              textAlign="left"
              ml={1}
              mt={0.5}
            >
              {trackingModes[values.trackingMode]?.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TimePicker
              handleTimeChange={handleTimeChange}
              name="cutOffTime"
              error={errors}
              defaultTime={values?.cutOffTime}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              btnText="Save"
              sx={{
                backgroundColor: 'var(--primary)',
                padding: '.7rem 3rem',
                '&:hover': {
                  backgroundColor: 'var(--primary)',
                  opacity: '0.93',
                },
              }}
              type={'submit'}
              loading={isLoading}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
