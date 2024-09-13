'use client';
import {useEffect} from 'react';

// Components
import ReportsHeader from '@/components/dashboard/reports/header';
import ReportsTables from '@/components/dashboard/reports/tables';

import {useDispatch} from 'react-redux';
import {cleanReports} from '@/shared/redux/slices/timeTracking';

export default function Reports() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(cleanReports());
    };
  }, []);
  return (
    <div>
      <ReportsHeader />
      <ReportsTables />
    </div>
  );
}
