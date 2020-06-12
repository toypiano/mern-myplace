import React from 'react';
import styled from 'styled-components';
import PlaceItem from './PlaceItem';

const StyledPlaceList = styled.ul`
  list-style: none;
  width: 90%;
  max-width: 40rem;
  margin: 1em auto;
  padding: 0;
`;

// Placeholder for dev
// const IMAGE = require('../../images/place_placeholder.png');

function PlaceList({ places, removePlace }) {
  return (
    <StyledPlaceList>
      {places.map((place) => (
        <PlaceItem
          key={place.id}
          placeId={place.id}
          creatorId={place.creator}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          coords={place.coords}
          removePlace={removePlace}
        />
      ))}
    </StyledPlaceList>
  );
}

export default PlaceList;
