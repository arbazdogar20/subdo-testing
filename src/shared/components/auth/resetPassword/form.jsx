'use client';
import authStyle from '@/shared/components/auth/auth.module.css';

import PropTypes from 'prop-types';

// React hook form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

// Components
import Button from '@/shared/components/button';
import PasswordInput from '@/shared/components/inputs/passwordInput';

// Constants
import {resetPasswordSchema} from '@/shared/schemas/auth';

export default function Form({onSubmit, isLoading}) {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  return (
    <form
      id="reset_form"
      className={authStyle.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={authStyle.spaceBtwLogoAndForm}></div>
      <h1 className={authStyle.heading}>Create new Password</h1>
      <span className={authStyle.forgotSubHeading}>
        Don&apos;t share your password with Others
      </span>

      <PasswordInput
        id="password"
        name={'password'}
        error={errors}
        control={control}
        label="Password"
        sx={{mt: 2}}
      />

      <PasswordInput
        id="confirmPassword"
        name={'confirmPassword'}
        error={errors}
        control={control}
        label="Confirm Password"
        sx={{mt: 2.6}}
      />

      <Button
        loading={isLoading}
        btnText="Set my password"
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
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
