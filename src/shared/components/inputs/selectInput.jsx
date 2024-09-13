import React, {useId} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ErrorMessage from './errorMessage';
import {Controller} from 'react-hook-form';
import './style.css';

function SelectInput({
  label,
  options,
  error,
  control,
  name,
  placeholder = 'Select a Type',
  ...rest
}) {
  const id = useId();
  const errorMsg = error[name]?.message;

  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({field: {value, onChange}}) => {
          return (
            <Select
              onChange={(selectedOption) => {
                onChange(selectedOption?.value);
              }}
              className={`${error && 'border-danger'}`}
              options={options}
              placeholder={placeholder}
              value={options?.filter((option) => option.value === value)}
              instanceId={id}
              {...rest}
            />
          );
        }}
      />
      {errorMsg && <ErrorMessage errorMsg={errorMsg} />}
    </div>
  );
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default SelectInput;
