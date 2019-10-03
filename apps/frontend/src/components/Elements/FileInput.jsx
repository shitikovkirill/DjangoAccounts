import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, FormText, Label, Input as BInput } from 'reactstrap';

const FileInput = ({ label, text, error, name, onChange, handleBlur}) => {
  const hasError = Boolean(error);
  return (
    <FormGroup>
      {label ? (<Label for={name}>{label}</Label>) : null}
      <BInput
        type="file"
        name={name}
        id={name}
        onChange={onChange}
        onBlur={handleBlur}
        invalid={hasError}
      />
      {error ? (<FormFeedback>{error}</FormFeedback>) : null}
      {text ? (<FormText color="muted">{text}</FormText>) : null}
    </FormGroup>
  )
};

FileInput.defaultProps = {
  label: null,
  text: null,
  error: null,
  handleBlur: () => {},
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  label: PropTypes.string,
  text: PropTypes.string,
  error: PropTypes.string,
};

export default FileInput