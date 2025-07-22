import { useParams } from "react-router";
import PlaceList from "../components/places/PlaceList";
import useHttp from "@/hooks/useHttp";
import { useContext, useEffect, useState } from "react";
import ErrorModal from "@/components/ErrorModal";
import { Spinner } from "@/components/Spinner";
import { AuthContext } from "@/hooks/AuthContext";
import { BACKEND_URL } from "@/utils/constants";

function UserPlaces() {
  const userId = useParams().userId;
  const [userPlaces, setUserPlaces] = useState();
  const { isLoading, errorMessage, errorModalOpen, sendRequest, clearError } =
    useHttp();

  const auth = useContext(AuthContext);
  const isCurrentUser = auth.userId === userId;

  const endpoint = `${BACKEND_URL}/places/user/${userId}`;

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const data = await sendRequest(endpoint);

        if (data && data.userPlaces) {
          setUserPlaces(data.userPlaces);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchPlaces();
  }, [sendRequest, endpoint]);

  function handleDeletePlace(deletedId) {
    setUserPlaces((prev) => prev.filter((place) => place.id !== deletedId));
  }

  // console.log(userPlaces);
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && userPlaces && (
        <PlaceList
          places={userPlaces}
          onDelete={handleDeletePlace}
          isCurrentUser={isCurrentUser}
        />
      )}
      <ErrorModal
        open={errorModalOpen}
        message={errorMessage}
        onClose={clearError}
      />
    </>
  );
}

export default UserPlaces;
