import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';

import { useHttpClient } from '../../shared/hooks/http-hooks';
// import { USERS } from '../../DUMMY_DATA';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const Users = () => {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // sends request with any Accept header but 'text/html' to the set proxy in package.json
        const responseData = await sendRequest('/api/users');
        setLoadedUsers(responseData.users);
      } catch (err) {
        // we're using error modal to show message from error state
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} closeModal={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
