import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';

function AlertWithIcon({severity, variant, message, ...props}) {
  return (
    <Alert severity={severity} variant={variant} {...props}>
      {message}
    </Alert>
  );
}

AlertWithIcon.propTypes = {
  severity: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertWithIcon;
