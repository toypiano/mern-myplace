import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from '../../shared/components/UIElements/Card';
import Avatar from '../../shared/components/UIElements/Avatar';
import { Link } from 'react-router-dom';

const StyledUsersItem = styled.li`
  margin: 1rem;
  width: calc(45% - 2rem);
  min-width: 17.5rem;

  .user-item__content {
    padding: 0;
    a {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: var(--white);
      background: var(--dark);
      padding: 1rem;
      h2 {
        color: var(--accent);
      }

      &:hover,
      &:active {
        background: var(--accent);
        h2,
        h3 {
          color: var(--dark);
        }
      }

      .user-item__image {
        width: 4rem;
        height: 4rem;
        margin-right: 1rem;
      }

      .user-item__info {
        h2 {
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
          font-weight: normal;
        }
        h3 {
          margin: 0;
        }
      }
    }
  }
`;

const UsersItem = ({ id, image, name, placeCount }) => {
  return (
    <StyledUsersItem className={`users-item`}>
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar src={image} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </StyledUsersItem>
  );
};

UsersItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeCount: PropTypes.number.isRequired,
};

export default UsersItem;
