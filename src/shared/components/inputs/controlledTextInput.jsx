import './style.css';
import PropTypes from 'prop-types';

// React hook form
import {Controller} from 'react-hook-form';

// MUI
import TextField from '@mui/material/TextField';

export default function ControlledTextInput({
  label,
  name,
  control,
  placeholder,
  error,
  type = 'text',
  sx,
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <TextField
          id={`outlined-basic-${name}`}
          error={!!error[name]}
          label={label}
          placeholder={placeholder}
          type={type}
          sx={sx}
          {...rest}
          {...field}
          helperText={error[name]?.message}
          onChange={(e) => field.onChange(e.target.value)}
          value={field.value || ''}
          fullWidth
        />
      )}
    />
  );
}

ControlledTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  type: PropTypes.string,
  error: PropTypes.object,
  sx: PropTypes.object,
  rest: PropTypes.any,
};
