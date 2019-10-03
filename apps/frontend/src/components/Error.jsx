import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Error = ({ error, clearError }) => {
  return (
    <Modal isOpen={Boolean(error)} toggle={clearError}>
      <ModalHeader toggle={clearError}>Error</ModalHeader>
      <ModalBody>
        {JSON.stringify(error)}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={clearError}>Ok</Button>
      </ModalFooter>
    </Modal>
  );
};

Error.propTypes = {
  error: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  clearError: PropTypes.func.isRequired,
};

export default Error;