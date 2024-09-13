import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import PropTypes from 'prop-types';

import {Controller} from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';

export default function ControlledSearchAbleSelectField({
  sx,
  label,
  name,
  control,
  options = [],
  getOptionLabel,
  errors,
  customErrorsMessage = '',
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <Box>
          <Autocomplete
            id={`combo-box-${name}`}
            options={options}
            sx={{
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
              ...sx,
            }}
            renderInput={(params) => (
              <TextField {...params} label={label} placeholder="Search" />
            )}
            fullWidth
            {...rest}
            {...field}
            onChange={(_, newValue) => {
              field.onChange(newValue);
            }}
            value={field.value || null}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            getOptionLabel={getOptionLabel}
          />
          {(customErrorsMessage || errors?.[name]) && (
            <FormHelperText sx={{color: '#d32f2f', fontSize: '12px', ml: 1.5}}>
              {customErrorsMessage || errors?.[name]?.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
}

ControlledSearchAbleSelectField.propTypes = {
  sx: PropTypes.object,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  rest: PropTypes.any,
  getOptionLabel: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  customErrorsMessage: PropTypes.string,
};
