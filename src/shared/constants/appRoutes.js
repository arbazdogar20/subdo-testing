import {ROLES} from '@/constants/roles';

export const appInfo = {
  title: 'Time Clock',
  description:
    'Manage employee time tracking and attendance with the Time Clock By Spiral Solution',
};

const path = (root, path) => `${root}${path}`;

export const ROOT_ROUTE = '/';
export const AUTH_ROOT = '/auth';
export const DASHBOARD_ROOT = '/dashboard';

export const AUTH_ROUTES = {
  login: path(AUTH_ROOT, '/login'),
  register: path(AUTH_ROOT, '/register'),
  forgotPassword: path(AUTH_ROOT, '/forgot-password'),
};

export const DASHBOARD_ROUTES = {
  home: path(DASHBOARD_ROOT, '/'),
  reports: path(DASHBOARD_ROOT, '/reports'),
  departments: path(DASHBOARD_ROOT, '/departments'),
  company: path(DASHBOARD_ROOT, '/company'),
  configuration: path(DASHBOARD_ROOT, '/configuration'),
  positions: path(DASHBOARD_ROOT, '/positions'),
};

const {admin, manager, employee} = ROLES;

export const ROLE_BASE_ROUTES = {
  [admin.value]: [path(DASHBOARD_ROOT, '')],
  [manager.value]: [
    path(DASHBOARD_ROOT, ''),
    path(DASHBOARD_ROOT, '/reports'),
    path(DASHBOARD_ROOT, '/departments'),
    path(DASHBOARD_ROOT, '/company'),
    path(DASHBOARD_ROOT, '/configuration'),
    path(DASHBOARD_ROOT, '/positions'),
    path(DASHBOARD_ROOT, '/entries'),
  ],
  [employee.value]: [path(DASHBOARD_ROOT, '')],
};
