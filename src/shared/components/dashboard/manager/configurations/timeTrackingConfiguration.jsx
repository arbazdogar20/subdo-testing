'use client';
import styles from './styles.module.css';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Components
import Button from '@/components/button';

// Hooks
import useSubmitFunction from '@/hooks/useSubmitFunction';

// Redux
import {
  activateTracking,
  deactivateTracking,
  deactivateTrackingFromAllDevices,
  hasTrackingActivated,
} from '@/redux/slices/timeTracking';
import {useState} from 'react';
import {useSelector} from 'react-redux';

export default function TimerTrackingConfiguration() {
  const {isLoading, onSubmitFunction} = useSubmitFunction();
  const [action, setAction] = useState('activate');

  const isTrackingAlreadyActivated = useSelector(hasTrackingActivated);

  const handleSubmit = async (value) => {
    setAction(value);
    let reduxFunc;
    if (value === 'activate') reduxFunc = activateTracking;
    else if (value === 'deactivate') reduxFunc = deactivateTracking;
    else reduxFunc = deactivateTrackingFromAllDevices;

    onSubmitFunction({
      reduxFunction: reduxFunc,
    });
  };

  const manageActivateLoading = action === 'activate' && isLoading;
  const manageDeactivateLoading = action === 'deactivate' && isLoading;
  const deactivateAllLoading = action === 'deactivateAll' && isLoading;

  return (
    <Box sx={{mt: 5}}>
      <Typography className={styles.main_container}>
        Manage Time Tracking
      </Typography>
      <Box sx={{width: '350px', margin: 'auto'}}>
        <Button
          type={'button'}
          onClick={() => handleSubmit('activate')}
          btnText={'Activate Timer'}
          sx={{
            mt: 2.5,
            backgroundColor: 'var(--primary)',
            '&:hover': {
              backgroundColor: 'var(--primary)',
              opacity: '0.93',
            },
          }}
          loading={manageActivateLoading}
          disabled={isLoading || isTrackingAlreadyActivated}
        />
        <Button
          type={'button'}
          onClick={() => handleSubmit('deactivate')}
          btnText={'Deactivate Timer'}
          sx={{
            mt: 2.5,
            backgroundColor: 'red',
            '&:hover': {
              backgroundColor: 'red',
              opacity: '0.8',
            },
          }}
          loading={manageDeactivateLoading}
          disabled={isLoading || !isTrackingAlreadyActivated}
        />
        <Button
          type={'button'}
          onClick={() => handleSubmit('deactivateAll')}
          btnText={'Deactivate Timer From All Devices'}
          sx={{
            mt: 2.5,
            backgroundColor: '#26729bff',
            '&:hover': {
              backgroundColor: 'red',
              opacity: '0.8',
            },
          }}
          loading={deactivateAllLoading}
          disabled={isLoading}
        />
      </Box>
    </Box>
  );
}
