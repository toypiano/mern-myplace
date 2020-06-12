import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Returns method (for making request) and state (for spinner & error modal)
 * @returns {{sendRequest: (url:string, method:string, body, headers) => Object | undefined, isLoading:boolean, error, clearError: () => void}}
 */
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequest = useRef([]);

  /**
   * @returns responseData
   */
  const sendRequest = useCallback(
    // need to initialize header as an empty object
    // https://javascript.info/fetch-api
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      // create new abort controller and add it to ref
      const httpAbortController = new AbortController();
      activeHttpRequest.current.push(httpAbortController);

      try {
        // fetch returns a promise that resolves with status and header
        const response = await fetch(url, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers,
          signal: httpAbortController.signal,
        });
        // read response body and parse as JSON
        const responseData = await response.json();
        // remove abortController to the request that we received the response data from
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (v) => v !== httpAbortController
        );

        // handle responses out of 200
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        // we need to set the loading state inside try/catch block
        // to be in-line with async flow
        setIsLoading(false);

        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        // we can catch this error inside another catch block.
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(false);
  };

  // abort any unresolved fetch request on mount/unmount
  useEffect(() => {
    activeHttpRequest.current.forEach((abortController) =>
      abortController.abort()
    );
  }, []);

  return {
    sendRequest,
    isLoading,
    error,
    clearError,
  };
};
