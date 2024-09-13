'use client';
import AdminDashboard from '@/shared/components/dashboard/admin';
import EmployeeDashboard from '@/shared/components/dashboard/employee';
import ManagerDashboard from '@/shared/components/dashboard/manager';
import {ROLES} from '@/shared/constants/roles';
import {getCurrentUser} from '@/shared/redux/slices/user';
import {useSelector} from 'react-redux';

export default function Dashboard() {
  const currentUser = useSelector(getCurrentUser);

  const role = currentUser?.systemRole;

  const {admin, manager, employee} = ROLES;

  const renderDashboard = () => {
    if (role === admin.value) {
      return <AdminDashboard />;
    } else if (role === manager.value) {
      return <ManagerDashboard />;
    } else if (role === employee.value) {
      return <EmployeeDashboard />;
    }
  };

  return <div>{renderDashboard()}</div>;
}
