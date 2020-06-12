import React from 'react';
import Modal from './Modal';
import Button from '../FormElements/Button';
import { useHistory } from 'react-router-dom';

function ErrorModal({ error, closeModal }) {
  const handleButtonClick = () => {
    closeModal();
  };
  return (
    <Modal
      header="Error"
      show={!!error}
      footer={<Button onClick={handleButtonClick}>CLOSE</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
}

export default ErrorModal;
