import React from 'react';
import styled from 'styled-components';

import UsersItem from './UsersItem';
import Card from '../../shared/components/UIElements/Card';

const StyledUsersList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const UsersList = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No user found</h2>
        </Card>
      </div>
    );
  }
  return (
    <StyledUsersList className={`users-list`}>
      {users.map((user) => (
        <UsersItem
          key={user.id}
          id={user.id}
          name={user.name}
          image={user.image}
          placeCount={user.places.length}
        />
      ))}
    </StyledUsersList>
  );
};

export default UsersList;
