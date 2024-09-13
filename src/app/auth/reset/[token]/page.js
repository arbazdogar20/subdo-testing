import style from '@/app/auth/auth.module.css';
import PropsType from 'prop-types';

import SideContainer from '@/shared/components/auth/sideContainer';
import ResetPasswordForm from '@/shared/components/auth/resetPassword';

export default function ResetPassword({params}) {
  return (
    <div className={style.container}>
      <div className={style.form}>
        <ResetPasswordForm token={params.token} />
      </div>
      <div className={style.side}>
        <SideContainer
          heading={'Forgot Password'}
          description={
            'To keep connected with us please reset your password & login again'
          }
          imgSrc="/images/forgot-password.svg"
        />
      </div>
    </div>
  );
}

ResetPassword.propTypes = {
  params: PropsType.object,
};
