'use client';
import {useEffect} from 'react';
import style from './style.module.css';
import PropTypes from 'prop-types';

import Sidebar from '@/components/dashboard/sideBar';
import TopBar from '@/components/dashboard/topBar';
import Footer from '@/shared/components/dashboard/footer';

import GlobalLayout from '@/shared/components/layouts/globalLayout';

import {useDispatch, useSelector} from 'react-redux';
import {getInitialAppData} from '@/shared/redux/slices/app';
import {getCurrentUser} from '@/shared/redux/slices/user';
import {useRouter} from 'next/navigation';
import {domainUrl} from '@/shared/utils/general';
import {AUTH_ROUTES} from '@/shared/constants/appRoutes';

export default function DashboardLayout({children}) {
  const dispatch = useDispatch();
  const currUser = useSelector(getCurrentUser);
  const router = useRouter();

  const isUserLoggedIn = Boolean(currUser?.id);

  useEffect(() => {
    if (isUserLoggedIn) dispatch(getInitialAppData());
    else router.push(`${domainUrl()}${AUTH_ROUTES.login}`);
  }, [currUser]);

  return (
    <GlobalLayout>
      {/* <VerifyUserLoginStatus /> */}
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
