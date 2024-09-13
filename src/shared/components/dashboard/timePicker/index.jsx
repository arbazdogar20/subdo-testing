'use client';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {MobileTimePicker} from '@mui/x-date-pickers/MobileTimePicker';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {DateTime} from 'luxon';
import Box from '@mui/material/Box';

export default function TimePicker({
  handleTimeChange,
  name,
  error,
  defaultTime,
  customErrorMessage,
  label = 'Cut-Off Time',
}) {
  const defaultValue = DateTime.now()
    .startOf('day')
    .plus({minute: defaultTime});

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Box>
        <MobileTimePicker
          name={name}
          label={label}
          className={styles.picker}
          defaultValue={defaultValue}
          onChange={handleTimeChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fef4f1ff',
              '& fieldset': {
                borderColor: 'var(--primary)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--primary)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--primary)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'var(--primary)',
              '&.Mui-focused': {
                color: 'var(--primary)',
              },
            },
          }}
        />
        {(customErrorMessage || error?.[name]) && (
          <Typography
            sx={{
              color: '#d32f2f',
              fontSize: '0.75rem',
              textAlign: 'left',
              marginTop: '3px',
              marginLeft: '14px',
            }}
          >
            {customErrorMessage || error[name]?.message || ''}
          </Typography>
        )}
      </Box>
    </LocalizationProvider>
  );
}

TimePicker.propTypes = {
  handleTimeChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.object,
  defaultTime: PropTypes.string,
  customErrorMessage: PropTypes.string,
  label: PropTypes.string,
};
