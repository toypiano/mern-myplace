import { useReducer, useCallback } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue;
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case 'SET_FORM_DATA':
      return {
        inputs: action.newFormState.inputs,
        isValid: action.newFormState.isValid,
      };
    default:
      return state;
  }
};

/**
 * Validates the form when inputChangeCallback is called in Input components
 * @param {Object} initialInputs { [inputId]: {value: string, isValid: boolean}}
 * @param {boolean} initialFormValidity
 * @returns [formState, inputChangeCallback, setFormDataCallback]
 */
export const useForm = (initialFormState) => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const inputChangeCallback = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', inputId: id, value, isValid });
  }, []);

  const setFormDataCallback = useCallback((newFormState) => {
    dispatch({
      type: 'SET_FORM_DATA',
      newFormState,
    });
  }, []);

  return [formState, inputChangeCallback, setFormDataCallback];
};
