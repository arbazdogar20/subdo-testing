import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ErrorMessage({errorMsg}) {
  return <div className="error-msg">{errorMsg}</div>;
}

ErrorMessage.propTypes = {
  errorMsg: PropTypes.string.isRequired,
};

export default ErrorMessage;
