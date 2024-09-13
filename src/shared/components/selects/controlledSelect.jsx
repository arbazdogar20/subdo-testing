import PropTypes from 'prop-types';

import {Controller} from 'react-hook-form';

// MUI
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function ControlledSelectField({
  name,
  label,
  control,
  errors,
  customErrorsMessage,
  options = [],
  sx,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field}) => (
        <FormControl
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fef4f1ff',
              borderRadius: '5px',
              '& fieldset': {
                border: '1px solid var(--primary)',
                borderRadius: '5px',
              },
              '&:hover fieldset': {
                border: '1px solid var(--primary)',
              },
              '&.Mui-focused fieldset': {
                border: '1px solid var(--primary)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'var(--primary)',
            },
          }}
        >
          <InputLabel id={`simple-select-label-${label}`}>{label}</InputLabel>
          <Select
            labelId={`simple-select-label-${label}`}
            id={`simple-select-${name}`}
            label={label}
            sx={{
              textAlign: 'left',
              ...sx,
            }}
            {...field}
            error={errors?.[name]}
            {...rest}
            onChange={(e) => field.onChange(e.target.value)}
            value={field.value || ''}
          >
            {options.map((item) => (
              <MenuItem key={item?.label} value={item?.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {(customErrorsMessage || errors?.[name]?.message) && (
            <FormHelperText sx={{color: '#d32f2f'}}>
              {customErrorsMessage || errors?.[name]?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

ControlledSelectField.propTypes = {
  sx: PropTypes.object,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  rest: PropTypes.any,
  errors: PropTypes.object.isRequired,
  customErrorsMessage: PropTypes.string,
};
