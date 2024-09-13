'use client';

import {useEffect, useState} from 'react';
import {useRouter, usePathname} from 'next/navigation';

// Constants
import {
  AUTH_ROUTES,
  DASHBOARD_ROUTES,
  ROLE_BASE_ROUTES,
} from '@/constants/appRoutes';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser} from '@/redux/slices/user';

// Hooks
import useRouteType from '@/hooks/useRouteType';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import Image from 'next/image';
import {domainUrl} from '@/shared/utils/general';
import {verifyActivatedTracking} from '@/shared/redux/slices/timeTracking';
import {getCurrentOrganization} from '@/shared/redux/slices/organization';

export default function AuthGuard({children}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const {isDashboardRoute, isAuthRoute} = useRouteType();

  const currentUser = useSelector(getCurrentUser);
  const currOrg = useSelector(getCurrentOrganization);

  const [shouldRenderChildren, setShouldRenderChildren] = useState(false);

  useEffect(() => {
    dispatch(verifyActivatedTracking());
  }, [currentUser]);

  useEffect(() => {
    const isAllowed =
      currentUser?.systemRole &&
      ROLE_BASE_ROUTES[currentUser?.systemRole]?.includes(pathname);

    if (!currentUser) {
      // if (isDashboardRoute)
      //   return router.push(`${domainUrl()}${AUTH_ROUTES.login}`);
    } else {
      // if (isAuthRoute || (isDashboardRoute && !isAllowed))
      //   return router.push(
      //     `${domainUrl({subDomain: currOrg?.domain})}${DASHBOARD_ROUTES.home}`
      //   );
    }

    setShouldRenderChildren(true);
  }, [currentUser, router, pathname, isDashboardRoute, isAuthRoute]);

  return shouldRenderChildren ? (
    children
  ) : (
    <div className={styles.loader}>
      <Image
        src={`${domainUrl()}/images/loader.svg`}
        width={80}
        height={80}
        alt="loader"
        priority="high"
      />
    </div>
  );
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
