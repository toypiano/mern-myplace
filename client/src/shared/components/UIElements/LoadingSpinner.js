import React from 'react';
import styled, { css } from 'styled-components';

const StyledLoadingSpinner = styled.div`
  ${(props) =>
    props.asOverlay
      ? css`
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : null}
  .spinner-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
    &::after {
      content: '';
      display: block;
      width: 46px;
      height: 46px;
      margin: 1px;
      border-radius: 50%;
      border: 5px solid var(--secondary);
      border-color: var(--secondary) transparent var(--secondary) transparent;
      animation: spinner-dual-ring 1.2s linear infinite;
    }
  }
  @keyframes spinner-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
function LoadingSpinner({ asOverlay }) {
  return (
    <StyledLoadingSpinner asOverlay={asOverlay}>
      <div className="spinner-dual-ring"></div>
    </StyledLoadingSpinner>
  );
}

export default LoadingSpinner;
