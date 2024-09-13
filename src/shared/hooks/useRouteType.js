import {usePathname} from 'next/navigation';

import {AUTH_ROOT, DASHBOARD_ROOT} from '@/constants/appRoutes';

const useRouteType = () => {
  const pathName = usePathname();

  const isDashboardRoute = pathName.includes(DASHBOARD_ROOT);
  const isAuthRoute = pathName.includes(AUTH_ROOT);
  const isPublicRoute = !isAuthRoute && !isDashboardRoute;

  return {isDashboardRoute, isAuthRoute, isPublicRoute};
};

export default useRouteType;
