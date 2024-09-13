'use client';
import {useRouter} from 'next/navigation';

// Components
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import Form from '@/shared/components/auth/login/form';

// Constants
import {DASHBOARD_ROUTES} from '@/shared/constants/appRoutes';

// Redux
import {signInUser} from '@/shared/redux/slices/user';

export default function Loginform() {
  const router = useRouter();
  const {isLoading, onSubmitFunction} = useSubmitFunction();

  const onSubmit = (data) => {
    const onSuccess = () => {
      // router.push(DASHBOARD_ROUTES.home);
    };

    onSubmitFunction({
      reduxFunction: signInUser,
      data,
      onSuccess,
    });
  };
  return <Form onSubmit={onSubmit} isLoading={isLoading} />;
}
