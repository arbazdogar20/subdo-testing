import authStyle from '../auth.module.css';

import Link from 'next/link';
import PropTypes from 'prop-types';

// MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// React hook form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

// Components
import PasswordInput from '@/components/inputs/passwordInput';
import ControlledTextInput from '@/shared/components/inputs/controlledTextInput';
import Button from '@/shared/components/button';
import ControlledSearchAbleSelectField from '@/components/selects/controlledSearchAbleSelectField';
import ControlledSelectField from '@/components/selects/controlledSelect';

// Constant
import {registerManagerSchema} from '@/shared/schemas/auth';
import {sanitizedAlphabetInput} from '@/shared/utils/general';
import {TIMEZONES} from '@/shared/constants/times';
import {trackingModes} from '@/constants/timeTrackingConstant';

export default function Form({onSubmit, isLoading, decodedToken}) {
  const {
    handleSubmit,
    control,
    formState: {errors},
    watch,
  } = useForm({
    resolver: yupResolver(registerManagerSchema),
    defaultValues: {
      firstName: decodedToken?.firstName || '',
      lastName: decodedToken?.lastName || '',
    },
  });

  const timezonesOptions = Object.keys(TIMEZONES).map((key) => ({
    label: key,
    value: TIMEZONES[key].value,
  }));

  const trackingModesArr = Object.values(trackingModes).map((item) => ({
    label: item.label,
    value: item.value,
  }));

  const values = watch();

  return (
    <form
      id="register_form"
      className={authStyle.form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div style={{height: '80px'}}></div>
      <h1 className={authStyle.heading}>Sign Up</h1>

      <div className={authStyle.registerPersonal}>
        <span>Personal Details</span>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <ControlledTextInput
            id="firstName"
            name={'firstName'}
            label="First Name"
            error={errors}
            placeholder="Enter your first Name"
            control={control}
            onInput={(e) =>
              (e.target.value = sanitizedAlphabetInput(e.target.value))
            }
            inputProps={{maxLength: 50}}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <ControlledTextInput
            id="lastName"
            name={'lastName'}
            label="Last Name"
            error={errors}
            placeholder="Enter your last Name"
            control={control}
            onInput={(e) =>
              (e.target.value = sanitizedAlphabetInput(e.target.value))
            }
            inputProps={{maxLength: 50}}
            fullWidth
            type="text"
          />
        </Grid>
      </Grid>

      <PasswordInput
        id="password"
        name={'password'}
        error={errors}
        control={control}
        label="Password"
        sx={{mt: 2.6}}
      />

      <PasswordInput
        id="confirmPassword"
        name={'confirmPassword'}
        error={errors}
        control={control}
        label="Confirm Password"
        sx={{mt: 2.6}}
      />

      <div className={authStyle.registerOrg}>
        <span>Organiztion Details</span>
      </div>

      <ControlledTextInput
        id="organizationName"
        name={'organizationName'}
        label="Organization Name"
        error={errors}
        placeholder="Enter your organization Name"
        inputProps={{maxLength: 200}}
        control={control}
        sx={{mb: 2}}
        fullWidth
      />

      <ControlledTextInput
        id="domian"
        name="domain"
        label="Subdomain"
        error={errors}
        placeholder="Enter your subdomain"
        inputProps={{maxLength: 20}}
        control={control}
        sx={{mb: 2}}
        fullWidth
        onInput={(e) => {
          e.target.value = e.target.value
            .toLowerCase()
            .replace(/^-|-{2,}|[^a-z0-9-]/g, '');
        }}
      />

      <ControlledSelectField
        name={'trackingMode'}
        control={control}
        label={'Tracking Mode'}
        options={trackingModesArr}
        errors={errors}
      />

      <Typography color="var(--secondary)" textAlign="left" ml={1} mt={0.5}>
        {trackingModes[values.trackingMode]?.description}
      </Typography>

      <ControlledSearchAbleSelectField
        id="time_zone"
        control={control}
        label="Time Zone"
        name="timezone"
        errors={errors}
        options={timezonesOptions}
        getOptionLabel={(option) => option.label}
        sx={{mt: 2}}
      />

      <Button
        type={'submit'}
        loading={isLoading}
        btnText="Register"
        sx={{
          my: 2.6,
          width: '100%',
          backgroundColor: 'var(--primary)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'var(--primary)',
          },
        }}
      />
      <Link href={`/auth/login`} className={authStyle.link}>
        Already have an account?
      </Link>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  decodedToken: PropTypes.object,
};
