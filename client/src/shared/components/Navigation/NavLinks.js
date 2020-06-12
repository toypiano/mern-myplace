import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { bp } from '../../styled/vars';

const StyledNavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  list-style: none;

  @media (min-width: ${bp.md}) {
    flex-direction: row;
    li {
      margin: 0 0.5em;
      a {
        color: var(--white);
      }
      button {
        border: 1px solid var(--white);
        color: var(--white);
        background: transparent;
      }
    }
  }

  a,
  button {
    color: var(--dark);
    text-decoration: none;
    padding: 0.5em;
    border: 1px solid transparent;
    &:focus {
      outline: none;
      border: thin dotted;
    }
  }

  a {
    &:hover,
    &:active,
    &.active {
      background: var(--accent);
      color: var(--dark);
    }
  }

  button {
    font: inherit;
    background: transparent;
    &:hover,
    &:active {
      background: var(--dark);
      color: var(--white);
    }
  }
`;

function NavLinks(props) {
  const { isLoggedIn, userId, logout } = useContext(AuthContext);
  return (
    <StyledNavLinks>
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/places`}>MY PLACE</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </StyledNavLinks>
  );
}

export default NavLinks;
