import {ROLES} from '@/constants/roles';

const {admin, manager, employee} = ROLES;

export const SIDEBAR_LINKS = {
  dashboard: {
    id: 1,
    title: 'Dashboard',
    link: '/dashboard',
    icon: '/images/dashboard/home.svg',
    allowed: [admin.value, employee.value, manager.value],
  },
  reports: {
    id: 2,
    title: 'Reports',
    link: '/dashboard/reports',
    icon: '/images/dashboard/report.svg',
    allowed: [manager.value],
  },
  modifyEntries: {
    id: 3,
    title: 'Modify Entries',
    link: '/dashboard/entries',
    icon: '/images/dashboard/report.svg',
    allowed: [manager.value],
  },
  department: {
    id: 4,
    title: 'Departments',
    link: '/dashboard/departments',
    icon: '/images/dashboard/department.svg',
    allowed: [manager.value],
  },
  positions: {
    id: 5,
    title: 'Positions',
    link: '/dashboard/positions',
    icon: '/images/dashboard/positions.svg',
    allowed: [manager.value],
  },
  configuration: {
    id: 6,
    title: 'Configuration',
    link: '/dashboard/configuration',
    icon: '/images/dashboard/settings.svg',
    allowed: [manager.value],
  },
};
