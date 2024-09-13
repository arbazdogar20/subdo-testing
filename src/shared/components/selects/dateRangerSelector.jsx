'use client';
import styles from './styles.module.css';
import 'react-day-picker/dist/style.css';
import {forwardRef, useState} from 'react';
import {DateTime} from 'luxon';
import {DayPicker} from 'react-day-picker';
import PropTypes from 'prop-types';
import {LuCalendarDays} from 'react-icons/lu';
// MUI
import Popover from '@mui/material/Popover';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material';
import {Controller} from 'react-hook-form';

const DateRangerSelector = forwardRef(
  ({control, errors, disabled = false, fromDate, toDate}, ref) => {
    const initializeRange = {
      from: fromDate || DateTime.now().minus({days: 1}).toJSDate(),
      to: toDate || DateTime.now().minus({days: 1}).toJSDate(),
    };
    const [selected, setSelected] = useState(initializeRange);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      if (!disabled) {
        setAnchorEl(event.currentTarget);
      }
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popOverId = open ? 'simple-popover' : undefined;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const today = DateTime.now().startOf('day').toJSDate();

    const handleSelect = (e, field) => {
      setSelected(e);
      const startDate = e?.from || '';
      const endDate = e?.to || '';
      field.onChange({startDate, endDate});
    };

    return (
      <div>
        <div
          className={styles.dateBox}
          aria-describedby={popOverId}
          style={{cursor: disabled ? 'not-allowed' : 'pointer'}}
          onClick={handleClick}
        >
          <div>
            {selected?.from?.toLocaleDateString()} -{' '}
            {selected?.to?.toLocaleDateString()}
          </div>
          <LuCalendarDays
            style={{cursor: disabled ? 'not-allowed' : 'pointer'}}
          />
        </div>
        {errors?.dateRange && (
          <div className={styles.dateErrorMsg}>
            {errors?.dateRange?.startDate?.message},{' '}
            {errors?.dateRange?.endDate?.message}
          </div>
        )}
        <Popover
          id={popOverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{
            '& .MuiPopover-paper': {
              width: isMobile ? '90%' : 'auto', // Adjust width for mobile
              maxWidth: '100%', // Ensure it doesn't overflow the viewport
              overflowX: 'hidden', // Prevent horizontal overflow
            },
          }}
        >
          <Controller
            name="dateRange"
            control={control}
            render={({field}) => (
              <DayPicker
                {...field}
                ref={ref}
                mode="range"
                numberOfMonths={isMobile ? 1 : 2} // Show one month on mobile
                selected={selected}
                onSelect={(e) => handleSelect(e, field)}
                styles={{
                  dayPicker: {
                    width: isMobile ? '100%' : 'auto',
                  },
                  root: {
                    '--rdp-background-color': 'var(--primary)',
                    '--rdp-accent-color': 'var(--primary)',
                  },
                }}
                disabled={[
                  {from: today, to: new Date(8640000000000000)}, // Disable today and future dates
                  disabled && {
                    from: new Date(0),
                    to: new Date(8640000000000000),
                  }, // Disable all dates if component is disabled
                ]}
                required
              />
            )}
          />
        </Popover>
      </div>
    );
  }
);

DateRangerSelector.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object,
  disabled: PropTypes.bool, // Add disabled prop type here
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
};

export default DateRangerSelector;
