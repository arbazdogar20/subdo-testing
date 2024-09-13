import style from '../../auth.module.css';
import PropsType from 'prop-types';

// Components
import Registerform from '@/shared/components/auth/register';
import SideContainer from '@/shared/components/auth/sideContainer';

export default function Register({params}) {
  return (
    <div className={style.container}>
      <div className={style.form}>
        <Registerform token={params.token} />
      </div>
      <div className={style.side}>
        <SideContainer
          heading={'Welcome!'}
          description={'Please complete your registration.'}
        />
      </div>
    </div>
  );
}

Register.propTypes = {
  params: PropsType.object,
};
