import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import { StyledPlaceForm } from '../components/PlaceForm';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/FormElements/Button';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

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
  },
  isValid: true,
};

function UpdatePlace(props) {
  const { placeId } = useParams();
  const { userId } = useContext(AuthContext);
  const history = useHistory();
  const [formState, inputChangeCallback, setFormDataCallback] = useForm(
    initialFormState
  );
  const [loadedPlace, setLoadedPlace] = useState(null);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(`/api/places/${placeId}`);
        setLoadedPlace(responseData.place);
        setFormDataCallback({
          inputs: {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          isValid: true,
        });
      } catch (err) {}
    };
    fetchPlace();
  }, [placeId, sendRequest, setFormDataCallback]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `/api/places/${placeId}`,
        'PATCH',
        {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        },
        {
          'Content-Type': 'application/json',
        }
      );
      history.push(`/${userId}/places`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      {/* Modal component is rendered through CSSTransition */}
      <ErrorModal error={error} closeModal={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlace && (
        <StyledPlaceForm onSubmit={handleFormSubmit}>
          <Input
            id="title"
            label="Title"
            element="input"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            initialValue={loadedPlace.title}
            initialIsValid={true}
            inputChangeCallback={inputChangeCallback}
          />
          <Input
            id="description"
            label="Description"
            element="textarea"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid title"
            initialValue={loadedPlace.description}
            initialIsValid={true}
            inputChangeCallback={inputChangeCallback}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
          <Button inverse type="button" onClick={() => history.goBack()}>
            CANCEL
          </Button>
        </StyledPlaceForm>
      )}
    </React.Fragment>
  );
}

export default UpdatePlace;
