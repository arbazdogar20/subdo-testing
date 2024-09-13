'use client';
import {useEffect} from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';

import Sidebar from '@/components/dashboard/sideBar';
import TopBar from '@/components/dashboard/topBar';
import Footer from '@/shared/components/dashboard/footer';
import VerifyUserLoginStatus from '@/shared/components/general/verifyUserLoginStatus';

import GlobalLayout from '@/shared/components/layouts/globalLayout';

import {useDispatch} from 'react-redux';
import {getInitialAppData} from '@/shared/redux/slices/app';

export default function DashboardLayout({children}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialAppData());
  }, []);

  return (
    <GlobalLayout>
      <VerifyUserLoginStatus />
      <div className={style.container}>
        <div className={style.siderBarWrapper}>
          <Sidebar />
        </div>
        <div className={style.topBarAndChildrenWrapper}>
          <TopBar />
          <div className={style.children}>{children}</div>
          <Footer />
        </div>
      </div>
    </GlobalLayout>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
