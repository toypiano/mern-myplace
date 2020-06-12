import React from 'react';
import styled from 'styled-components';

const StyledAvatar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
function Avatar({ src, alt, width, height }) {
  return (
    <StyledAvatar>
      <img
        //TODO: replace src with the real image url
        src={require('../../../images/user_placeholder.png')}
        alt={alt}
        width={width}
        height={height}
      />
    </StyledAvatar>
  );
}

export default Avatar;
