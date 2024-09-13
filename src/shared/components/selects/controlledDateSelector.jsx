import PropTypes from 'prop-types';

import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Controller} from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';

export default function ControlledDateSelector({
  control,
  name,
  label = 'Date Selector',
  errors,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <Box>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DemoContainer
              components={['DatePicker', 'DatePicker']}
              sx={{
                mt: -1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#fef4f1ff',
                  borderRadius: '5px',
                  '& fieldset': {
                    border: '1px solid #f27649',
                    borderRadius: '5px',
                  },
                  '&:hover fieldset': {
                    border: '1px solid #f27649',
                  },
                  '&.Mui-focused fieldset': {
                    border: '1px solid #f27649',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#f27649',
                  '&.Mui-focused': {
                    color: '#f27649',
                  },
                },
              }}
            >
              <DatePicker
                sx={{
                  width: '100%',
                  '& .MuiButtonBase-root': {
                    color: '#f27649',
                  },
                }}
                {...field}
                label={label}
                value={field.value || null}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                disableFuture
              />
            </DemoContainer>
          </LocalizationProvider>
          {errors?.[name] && (
            <FormHelperText
              sx={{
                color: '#db2f2fff',
                ml: 1,
              }}
            >
              {errors?.[name]?.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
}

ControlledDateSelector.propTypes = {
  control: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.any,
};
