import { useParams } from "react-router";
import PlaceList from "../components/places/PlaceList";
import useHttp from "@/hooks/useHttp";
import { useEffect, useState } from "react";
import ErrorModal from "@/components/ErrorModal";
import { Spinner } from "@/components/Spinner";

function UserPlaces() {
  const userId = useParams().userId;
  const [userPlaces, setUserPlaces] = useState();
  const { isLoading, errorMessage, errorModalOpen, sendRequest, clearError } =
    useHttp();

  const endpoint = `http://localhost:5000/api/places/user/${userId}`;

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

  // console.log(userPlaces);
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && userPlaces && <PlaceList places={userPlaces} />}
      <ErrorModal
        open={errorModalOpen}
        message={errorMessage}
        onClose={clearError}
      />
    </>
  );
}

export default UserPlaces;
