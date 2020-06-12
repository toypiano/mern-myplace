import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { AuthContext } from '../../shared/context/auth-context';

const initialFormState = {
  email: {
    value: '',
    isValid: false,
  },
  password: {
    value: '',
    isValid: false,
  },
  isValid: false,
};

function Auth({ className }) {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputChangeCallback, setFormDataCallback] = useForm(
    initialFormState
  );
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const handleSwitchMode = () => {
    if (isLoginMode) {
      // switch from login to signup
      setFormDataCallback({
        inputs: {
          ...formState.inputs,
          // add name field
          name: {
            value: '',
            isValid: false,
          },
        },
        isValid: false,
      });
    } else {
      // switch from signup to login
      const isLoginFormValid =
        formState.inputs.email.isValid && formState.inputs.password.isValid;
      setFormDataCallback({
        inputs: {
          ...formState.inputs,
          name: undefined,
        },
        isValid: isLoginFormValid,
      });
    }
    setIsLoginMode((bool) => !bool);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'api/users/login',
          'POST',
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          '/api/users/signup',
          'POST',
          {
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.user.id);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} closeModal={clearError} />
      <Card className={className}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
        <hr />
        <form onSubmit={handleFormSubmit}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name"
              inputChangeCallback={inputChangeCallback}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            inputChangeCallback={inputChangeCallback}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password minimum 6 characters"
            inputChangeCallback={inputChangeCallback}
          />
          <div className="auth__buttons">
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? 'LOGIN' : 'SIGNUP'}
            </Button>
            <Button inverse type="button" onClick={handleSwitchMode}>
              SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
}

export default styled(Auth)`
  width: 90%;
  max-width: 25rem;
  margin: 7rem auto;
  h2 {
    text-align: center;
  }
  form {
    .auth__buttons {
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }
  }
`;
