import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

function Button({
  className,
  children,
  href,
  to,
  exact,
  type,
  onClick,
  disabled,
}) {
  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link className={className} to={to} exact={exact}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

const inverseCss = css`
  background: transparent;
  color: var(--primary);
  &:hover,
  &:active {
    color: var(--white);
    background: var(--primary);
  }
`;

const dangerCss = css`
  background: var(--danger);
  border-color: var(--danger);
  &:hover,
  &:active {
    background: var(--danger-lighten);
    border-color: var(--danger-lighten);
  }
`;

// Must pass className prop down to the wrapped component
export default styled(Button)`
  font: inherit;
  padding: 0.5em 1.5em;
  cursor: pointer;
  margin-right: 1em;
  border-radius: 4px;
  border: 1px solid var(--primary);
  background: var(--primary);
  color: var(--white);
  display: inline-block;
  text-decoration: none;
  &:focus {
    outline: thin dotted;
  }
  &:hover,
  &:active {
    background: var(--primary-lighten);
    border-color: var(--primary-lighten);
  }

  &:disabled,
  &:hover:disabled,
  &:active:disabled {
    background: var(--disabled-bg);
    color: var(--disabled);
    border-color: var(--disabled-bg);
    cursor: not-allowed;
  }

  ${(props) => (props.inverse ? inverseCss : null)}
  ${(props) => (props.danger ? dangerCss : null)}
  ${(props) => (props.small ? 'font-size: 0.8rem;' : null)}
  ${(props) => (props.big ? 'font-size: 1.5rem;' : null)}
`;
