'use client';
import authStyle from '@/shared/components/auth/auth.module.css';
import PropTypes from 'prop-types';

import Link from 'next/link';

// React hook form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

// Components
import ControlledTextInput from '@/shared/components/inputs/controlledTextInput';
import PasswordInput from '@/components/inputs/passwordInput';
import Button from '@/shared/components/button';

// Constants
import {loginUserSchema} from '@/shared/schemas/auth';
import {AUTH_ROUTES} from '@/shared/constants/appRoutes';

export default function Form({onSubmit, isLoading}) {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginUserSchema),
  });

  return (
    <form className={authStyle.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={authStyle.spaceBtwLogoAndForm}></div>
      <h1 className={authStyle.heading}>Log In</h1>
      <ControlledTextInput
        name={'email'}
        label="Email"
        error={errors}
        placeholder="Enter your email"
        control={control}
        fullWidth
      />

      <PasswordInput
        name={'password'}
        error={errors}
        control={control}
        label="Password"
        sx={{mt: 2.6}}
        placeholder={'Enter your password'}
      />

      <div className={authStyle.forgotPasswordDiv}>
        <Link href={AUTH_ROUTES.forgotPassword} className={authStyle.link}>
          Forgot Password
        </Link>
      </div>

      <Button
        loading={isLoading}
        btnText="Log In"
        type={'submit'}
        sx={{
          width: '100%',
          backgroundColor: 'var(--primary)',
          mt: 2.6,
          '&:hover': {
            backgroundColor: 'var(--primary)',
          },
        }}
      />
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
