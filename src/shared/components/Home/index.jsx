'use client';
import style from './style.module.css';

import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';

// MUI
import {CircularProgress} from '@mui/material';

// Components
const loading = () => (
  <CircularProgress size={100} sx={{color: 'var(--primary)'}} />
);

import Logo from '@/components/logo';
const StrictModeForm = dynamic(() => import('./strictModeForm'), {
  ssr: false,
  loading,
});
const FlexibleModeForm = dynamic(() => import('./flexibleModeForm'), {
  ssr: false,
  loading,
});

// Constants
import {status, trackingModes} from '@/shared/constants/timeTrackingConstant';

// Redux
import {useSelector} from 'react-redux';
import {
  getCurrentTimeTracking,
  getTrackingMode,
} from '@/redux/slices/timeTracking';

export default function HomeComponent() {
  const timeTracking = useSelector(getCurrentTimeTracking);
  const trackingMode = useSelector(getTrackingMode);

  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (trackingMode !== trackingModes.flexible.value) return;
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const elapsed = now - startTime;
        setElapsedTime(elapsedTime + elapsed);
        setStartTime(now);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, elapsedTime, trackingMode]);

  useEffect(() => {
    if (trackingMode !== trackingModes.flexible.value) return;
    setElapsedTime(timeTracking?.activeTime || 0);
    setIsRunning(timeTracking?.currentStatus === status.checkin.value);
    setStartTime(new Date().getTime());
  }, [timeTracking, trackingMode]);

  return (
    <div className={style.container}>
      <Logo />
      <div className={style.dividerBtwLogoAndText}></div>
      {trackingMode === trackingModes.flexible.value ? (
        <FlexibleModeForm elapsedTime={elapsedTime} />
      ) : (
        <StrictModeForm />
      )}
    </div>
  );
}
