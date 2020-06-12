import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  position: relative;
  margin: 0;
  padding: 1rem;
  overflow: hidden;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;

const Card = (props) => {
  return (
    <StyledCard className={`card ${props.className}`} style={props.style}>
      {props.children}
    </StyledCard>
  );
};

export default Card;
