import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, FormText, Label, Input as BInput } from 'reactstrap';

const Input = ({ label, text, error, type, name, value, onChange, handleBlur }) => {
  const hasError = Boolean(error);
  return (
    <FormGroup>
      {label ? (<Label for={name}>{label}</Label>) : null}
      <BInput
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        invalid={hasError}
      />
      {error ? (<FormFeedback>{error}</FormFeedback>) : null}
      {text ? (<FormText color="muted">{text}</FormText>) : null}
    </FormGroup>
  )
};

Input.defaultProps = {
  type: "text",
  label: null,
  text: null,
  error: null,
  handleBlur: () => {
  },
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  label: PropTypes.string,
  text: PropTypes.string,
  error: PropTypes.string,
};

export default Input