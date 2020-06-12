import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import { validate } from '../../util/validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

function Input({
  className,
  id,
  label,
  element,
  type,
  placeholder,
  initialValue,
  initialIsValid,
  validators,
  errorText,
  rows,
  inputChangeCallback,
}) {
  const initialInputState = {
    value: initialValue || '',
    isValid: initialIsValid || false,
    isTouched: false,
  };

  const [inputState, dispatch] = useReducer(inputReducer, initialInputState);

  useEffect(() => {
    inputChangeCallback(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, inputChangeCallback]);

  const handleInputChange = (e) => {
    dispatch({
      type: 'CHANGE',
      value: e.target.value,
      validators,
    });
  };

  const handleInputBlur = (e) => {
    dispatch({
      type: 'TOUCH',
    });
  };

  let inputControl;
  switch (element) {
    case 'input':
      inputControl = (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          value={inputState.value}
        />
      );
      break;
    case 'textarea':
      inputControl = (
        <textarea
          id={id}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          value={inputState.value}
          rows={rows || 3}
        ></textarea>
      );
      break;
    default:
      throw new Error('Invalid input element passed.');
  }
  return (
    // You must attach the passed className prop to the DOM element
    // to style the component with styled method
    <div
      className={`form-control ${className} ${
        !inputState.isValid && inputState.isTouched
          ? 'form-control--invalid'
          : null
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {inputControl}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
}

export default styled(Input)`
  margin: 1em 0;

  label,
  input,
  textarea {
    display: block;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  input,
  textarea {
    width: 100%;
    font: inherit;
    border: 1px solid var(--disabled-bg);
    background: var(--light);
    padding: 0.15em 0.25em;
  }

  input:focus,
  textarea:focus {
    outline: none;
    background: var(--focus-bg);
    border-color: var(--secondary);
  }

  &.form-control--invalid {
    label,
    p {
      color: var(--danger);
    }

    input,
    textarea {
      border-color: var(--danger);
      background: var(--danger-bg);
    }
  }
`;
