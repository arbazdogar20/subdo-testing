import PropTypes from 'prop-types';

// MUI
import CircularProgress from '@mui/material/CircularProgress';
import MUIButton from '@mui/material/Button';

export default function Button({
  btnText,
  loading,
  onClick,
  disabled,
  variant = 'contained',
  sx,
  type,
  ...rest
}) {
  return (
    <MUIButton
      variant={variant}
      type={type}
      disabled={loading || disabled}
      color="success"
      {...rest}
      sx={sx}
      onClick={onClick}
      fullWidth
    >
      {!loading ? (
        btnText
      ) : (
        <CircularProgress
          size={25}
          sx={{color: 'var(--primary)'}}
          thickness={6}
        />
      )}
    </MUIButton>
  );
}

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  rest: PropTypes.any,
  sx: PropTypes.object,
  type: PropTypes.string,
};
