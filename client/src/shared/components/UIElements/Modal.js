import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { bp } from '../../styled/vars';
import Backdrop from './Backdrop';

const StyledModal = styled.div`
  position: fixed;
  z-index: var(--z-modal);
  background: var(--white);
  left: 10%;
  width: 80%;
  top: 22vh;
  box-shadow: var(--shadow);
  header {
    background: var(--secondary);
    color: var(--white);
    padding: 1em 0.5em;
    width: 100%;
    h2 {
      margin: 0.5rem;
    }
  }

  .modal__content {
    padding: 1em 0.5em;
  }

  footer {
    padding: 1em 0.5em;
  }
  /* Rules for CSSTransition states */
  &.modal-enter {
    transform: translateY(-10rem);
    opacity: 0;
  }
  &.modal-enter-active {
    transition: all 200ms;
    transform: translateY(0);
    opacity: 1;
  }
  &.modal-exit {
    transform: translateY(0);
    opacity: 1;
  }
  &.modal-exit-active {
    transition: all 200ms;
    transform: translateY(-10rem);
    opacity: 0;
  }

  @media (min-width: ${bp.md}) {
    width: 40rem;
    left: calc(50% - 20rem);
  }
`;
function Modal({
  className,
  closeModal,
  style,
  show,
  header,
  children,
  footer,
  onSubmit,
}) {
  const content = (
    <React.Fragment>
      {show && <Backdrop onClick={closeModal} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <StyledModal className={`modal ${className}`} style={style}>
          {/* no need to inject header & footer class with styled-components*/}
          <header className={`modal__header`}>
            <h2>{header}</h2>
          </header>
          <form
            onSubmit={
              onSubmit
                ? onSubmit
                : (e) => {
                    e.preventDefault();
                  }
            }
          >
            <div className="modal__content">{children}</div>
            <footer className={`modal__footer`}>{footer}</footer>
          </form>
        </StyledModal>
      </CSSTransition>
    </React.Fragment>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
}

export default Modal;
