import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';

import { useHttpClient } from '../../shared/hooks/http-hooks';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  const removePlace = (placeId) => {
    setLoadedPlaces((places) => places.filter((place) => place.id !== placeId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} closeModal={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlaces && (
        <PlaceList places={loadedPlaces} removePlace={removePlace} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
