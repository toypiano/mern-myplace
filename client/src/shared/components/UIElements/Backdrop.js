import React from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: var(--z-backdrop);
`;
function Backdrop({ onClick }) {
  return createPortal(
    <StyledBackdrop onClick={onClick}></StyledBackdrop>,
    document.getElementById('backdrop-hook')
  );
}

export default Backdrop;
