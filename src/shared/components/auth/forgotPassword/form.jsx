'use client';
import authStyle from '@/shared/components/auth/auth.module.css';

import Link from 'next/link';
import PropTypes from 'prop-types';

// React hook form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

// Components
import ControlledTextInput from '@/shared/components/inputs/controlledTextInput';
import Button from '@/shared/components/button';

// Constants
import {sendResetPasswordLinkSchema} from '@/shared/schemas/auth';
import {AUTH_ROUTES} from '@/shared/constants/appRoutes';

export default function Form({onSubmit, isLoading}) {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(sendResetPasswordLinkSchema),
  });

  return (
    <form className={authStyle.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={authStyle.spaceBtwLogoAndForm}></div>
      <h1 className={authStyle.heading}>Forgot you password?</h1>
      <span className={authStyle.forgotSubHeading}>
        Enter your email below to receive a password reset link.
      </span>
      <ControlledTextInput
        id="email"
        name={'email'}
        label="Email"
        error={errors}
        placeholder="Enter your email"
        control={control}
        fullWidth
        sx={{mt: 2.6}}
      />

      <Button
        loading={isLoading}
        btnText="Reset Password"
        type={'submit'}
        sx={{
          width: '100%',
          backgroundColor: 'var(--primary)',
          mt: 2.6,
          py: 1.2,
          '&:hover': {
            backgroundColor: 'var(--primary)',
          },
        }}
      />

      <div
        className={authStyle.forgotPasswordDiv}
        style={{textAlign: 'center', marginTop: '20px'}}
      >
        Remember Password?{' '}
        <Link href={AUTH_ROUTES.login} className={authStyle.link}>
          Login
        </Link>
      </div>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
