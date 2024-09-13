import style from '@/app/auth/auth.module.css';

import SideContainer from '@/shared/components/auth/sideContainer';
import ForgotPasswordForm from '@/shared/components/auth/forgotPassword';

export default function ForgotPassword() {
  return (
    <div className={style.container}>
      <div className={style.form}>
        <ForgotPasswordForm />
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
