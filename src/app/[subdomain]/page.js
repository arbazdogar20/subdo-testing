'use client';
import style from '@/app/auth/auth.module.css';
import {useEffect} from 'react';

import SideContainer from '@/components/auth/sideContainer';
import HomeComponent from '@/components/Home';

// Redux
import {dispatch} from '@/shared/redux/store';
import {getInitialPublicData} from '@/shared/redux/slices/app';

export default function Home() {
  useEffect(() => {
    dispatch(getInitialPublicData());
  }, []);
  return (
    <div className={style.container}>
      <div className={style.form}>
        <HomeComponent />
      </div>
      <div className={style.side}>
        <SideContainer
          heading={'Welcome Back!'}
          description={'Please check in with your Employee ID'}
        />
      </div>
    </div>
  );
}
