'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

import PropTypes from 'prop-types';

// Components
import Form from '@/shared/components/auth/resetPassword/form';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';

// Constants
import CustomMsg from '@/components/general/customMsg';
import {AUTH_ROUTES} from '@/shared/constants/appRoutes';
import {jwtDecode} from '@/shared/utils/jwtUtils';

// Redux
import {resetPassword} from '@/shared/redux/slices/user';

export default function ResetPasswordForm({token}) {
  const router = useRouter();
  const {success, isTokenExpired} = jwtDecode({token});

  const {isLoading, onSubmitFunction} = useSubmitFunction();
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const onSubmit = (data) => {
    data.token = token;
    onSubmitFunction({
      reduxFunction: resetPassword,
      data,
      onSuccess: () => setIsPasswordReset(true),
    });
  };

  if (isTokenExpired || !success)
    return (
      <CustomMsg
        text="Password Reset Link Expired. Please request a new link."
        onClick={() => router.push(AUTH_ROUTES.forgotPassword)}
        btnText="Go to Forgot Password"
      />
    );
  else if (isPasswordReset)
    return (
      <CustomMsg
        text="Password Reset Successfully. Please login."
        btnText="Go to Login"
        onClick={() => router.push(AUTH_ROUTES.login)}
      />
    );
  else return <Form onSubmit={onSubmit} isLoading={isLoading} />;
}

ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
};
