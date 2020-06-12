import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
`;
function Map({ center, zoom }) {
  // Render google map onto the element with ref
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google.maps) {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      });

      new window.google.maps.Marker({ position: center, map });
    }
  }, [center, zoom]);

  return <StyledMap ref={mapRef}>Map</StyledMap>;
}

export default Map;
