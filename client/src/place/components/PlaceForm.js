import React, { useContext } from 'react';
import styled from 'styled-components';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

export const StyledPlaceForm = styled.form`
  background: var(--white);
  width: 90%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 1em;
  border-radius: 6px;
  box-shadow: var(--shadow);
`;
const initialFormState = {
  inputs: {
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    },
    address: {
      value: '',
      isValid: false,
    },
  },
  isValid: false,
};

function PlaceForm(props) {
  const { userId } = useContext(AuthContext);
  const [formState, inputChangeCallback] = useForm(initialFormState);

  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      address: formState.inputs.address.value,
      creator: userId,
    };

    try {
      await sendRequest('/api/places', 'POST', body, {
        'Content-Type': 'application/json',
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <StyledPlaceForm onSubmit={handleFormSubmit}>
      <ErrorModal error={error} closeModal={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        inputChangeCallback={inputChangeCallback}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (5 characters minimum)"
        inputChangeCallback={inputChangeCallback}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        inputChangeCallback={inputChangeCallback}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </StyledPlaceForm>
  );
}

export default PlaceForm;
