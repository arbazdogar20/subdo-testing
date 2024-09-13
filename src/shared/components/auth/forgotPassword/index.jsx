'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

// Components
import Form from '@/shared/components/auth/forgotPassword/form';

// Constants
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import CustomMsg from '@/components/general/customMsg';
import {AUTH_ROUTES} from '@/shared/constants/appRoutes';

// Redux
import {sendResetPasswordLink} from '@/shared/redux/slices/user';

export default function ForgotPasswordForm() {
  const router = useRouter();

  const {isLoading, onSubmitFunction} = useSubmitFunction();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onSubmit = (data) => {
    onSubmitFunction({
      reduxFunction: sendResetPasswordLink,
      data,
      onSuccess: () => setIsEmailSent(true),
    });
  };

  if (isEmailSent)
    return (
      <CustomMsg
        text="A link was sent to your email, please use that to reset your password."
        btnText="Go to Login"
        onClick={() => router.push(AUTH_ROUTES.login)}
      />
    );
  else return <Form onSubmit={onSubmit} isLoading={isLoading} />;
}
