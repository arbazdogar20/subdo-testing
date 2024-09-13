import './style.css';

import {useState} from 'react';
import PropTypes from 'prop-types';

// React hook form
import {Controller} from 'react-hook-form';

// MUI
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';

// Icons
import {FaEye, FaEyeSlash} from 'react-icons/fa';

export default function PasswordInput({
  name,
  control,
  label,
  placeholder,
  sx,
  error,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <FormControl
          fullWidth
          variant="outlined"
          sx={sx || {my: 2.6}}
          error={!!error[name]}
        >
          <InputLabel
            htmlFor={`outlined-adornment-${name}`}
            sx={{color: 'var(--primary)'}}
          >
            {label}
          </InputLabel>
          <OutlinedInput
            id={`outlined-adornment-${name}`}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            autoComplete="new-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {!showPassword ? (
                    <FaEyeSlash color="var(--primary)" />
                  ) : (
                    <FaEye color="var(--primary)" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            {...rest}
            {...field}
            label={label}
            error={!!error[name]}
            value={field.value || ''}
            fullWidth
          />
          <FormHelperText id="component-helper-text" error>
            {error[name]?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  error: PropTypes.object,
  rest: PropTypes.any,
  sx: PropTypes.object,
};
