import PropTypes from 'prop-types';

// MUI
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularLoader({size = 25, thickness = 3, sx}) {
  return (
    <CircularProgress
      size={size}
      sx={{color: 'var(--primary)', ...sx}}
      thickness={thickness}
    />
  );
}

CircularLoader.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
  sx: PropTypes.object,
};
