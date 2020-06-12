import React from 'react';
import styled from 'styled-components';
import { bp } from '../../styled/vars';

const StyledMenuButton = styled.button`
  --size: 3rem;
  width: var(--size);
  height: var(--size);
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  margin-right: 2rem;
  span {
    display: block;
    width: 100%;
    height: 4px;
    background: var(--white);
  }

  @media (min-width: ${bp.md}) {
    display: none;
  }
`;
function MenuButton({ onClick }) {
  return (
    <StyledMenuButton onClick={onClick}>
      <span />
      <span />
      <span />
    </StyledMenuButton>
  );
}

export default MenuButton;
