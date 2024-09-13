'use client';

import PropTypes from 'prop-types';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

// Components
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import CustomMsg from '@/shared/components/general/customMsg';
import Form from '@/components/auth/register/form';

// Constant
import {AUTH_ROUTES} from '@/shared/constants/appRoutes';

// Redux
import {registerManager} from '@/shared/redux/slices/user';
import {jwtDecode} from '@/shared/utils/jwtUtils';

export default function Registerform({token}) {
  const router = useRouter();
  const {isLoading, onSubmitFunction} = useSubmitFunction();
  const {isTokenExpired, success, decodedToken} = jwtDecode({token});
  const [isRegisterd, setIsRegisterd] = useState(false);

  const onSubmit = (data) => {
    data.token = token;
    data.timezone = data?.timezone?.value || undefined;
    onSubmitFunction({
      reduxFunction: registerManager,
      data,
      onSuccess: () => setIsRegisterd(true),
    });
  };

  if (isTokenExpired || !success)
    return (
      <CustomMsg text="Invitation Link Expired. Please contact support and try again." />
    );
  if (isRegisterd)
    return (
      <CustomMsg
        text={'Registration Successful. Please login.'}
        onClick={() => router.push(AUTH_ROUTES.login)}
        btnText="Login"
      />
    );
  return (
    <Form
      onSubmit={onSubmit}
      isLoading={isLoading}
      decodedToken={decodedToken}
    />
  );
}

Registerform.propTypes = {
  token: PropTypes.string.isRequired,
};
