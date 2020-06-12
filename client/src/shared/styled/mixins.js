import { css } from 'styled-components';

export const desktop = (...args) => {
  return css`
    @media (min-width: 768px) {
      ${css(...args)}
    }
  `;
};
