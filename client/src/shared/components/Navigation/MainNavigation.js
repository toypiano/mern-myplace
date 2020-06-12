import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { bp } from '../../styled/vars';
import MenuButton from './MenuButton';
import NavLinks from './NavLinks';

const StyledMainNavigation = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  z-index: 5;
  display: flex;
  align-items: center;
  background: var(--primary);
  box-shadow: var(--shadow);
  padding: 0 1em;

  h1 a {
    text-decoration: none;
    color: var(--white);
  }
  nav {
    display: none;
  }
  @media (min-width: ${bp.md}) {
    justify-content: space-between;
    nav {
      display: block;
    }
    .main-navigation__menu-btn {
      display: none;
    }
  }
`;
function MainNavigation(props) {
  return (
    <StyledMainNavigation>
      <MenuButton className="main-navigation__menu-btn" />
      <h1>
        <Link to="/">My Place</Link>
      </h1>
      <nav>
        <NavLinks />
      </nav>
    </StyledMainNavigation>
  );
}

export default MainNavigation;
