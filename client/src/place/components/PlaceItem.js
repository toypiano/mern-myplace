import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const StyledPlaceItem = styled.li`
  margin: 1rem 0;
  .place-item__content {
    padding: 0;
    .place-item__image {
      width: 100%;
      height: 12.5rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .place-item__info {
      text-align: center;
      padding: 1em;
      h2,
      h3,
      p {
        margin: 0 0 0.5em 0;
      }
    }
    .place-item__actions {
      padding: 1em;
      text-align: center;
      border-top: 1px solid var(--disabled-bg);
    }
  }
`;

const StyledModal = styled(Modal)`
  .map-container {
    width: 100%;
    height: 15rem;
  }
  header {
    text-align: center;
  }
  footer {
    text-align: right;
  }
`;

function PlaceItem({
  placeId,
  image,
  title,
  address,
  description,
  coords,
  removePlace,
  creatorId,
}) {
  const { userId } = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [confirmModalShowing, setConfirmModalShowing] = useState(false);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);
  const showDeleteWarning = () => setConfirmModalShowing(true);
  const cancelDelete = () => setConfirmModalShowing(false);
  const confirmDelete = async () => {
    setConfirmModalShowing(false);
    try {
      await sendRequest(`/api/places/${placeId}`, 'DELETE');
    } catch {}
    // update UserPlaces loadedPlaces and re-render
    removePlace(placeId);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} closeModal={clearError} />
      <StyledModal
        show={showMap}
        closeModal={closeMap}
        header={address}
        footer={<Button onClick={closeMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coords} zoom={16} />
        </div>
      </StyledModal>
      <StyledModal
        show={confirmModalShowing}
        header="Are you sure?"
        footer={
          <>
            <Button inverse onClick={cancelDelete}>
              CANCEL
            </Button>
            <Button onClick={confirmDelete}>DELETE</Button>
          </>
        }
      >
        <p>
          Do you really want to proceed to delete this place? You CANNOT UNDO
          this action.
        </p>
      </StyledModal>
      <StyledPlaceItem>
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              VIEW ON MAP
            </Button>
            {userId === creatorId && (
              <Button to={`/places/${placeId}`}>EDIT</Button>
            )}
            {userId === creatorId && (
              <Button danger onClick={showDeleteWarning}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </StyledPlaceItem>
    </React.Fragment>
  );
}

export default PlaceItem;
