import { Button } from "@/components/ui/button";
import PlaceItem from "./PlaceItem";
import { Link } from "react-router";

function PlaceList({ places, onDelete, isCurrentUser = false }) {
  if (!places || places.length === 0) {
    return (
      <div className="error_container">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-[30px]">
            {isCurrentUser
              ? "You haven't posted any place yet"
              : "This user hasn't posted any place"}
          </h2>
          {isCurrentUser && (
            <Link to="/places/new">
              <Button variant="default">Share place</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">{isCurrentUser ? "Your Places" : "Places"}</h1>
      <ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mt-[50px]">
        {places.map((place) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            address={place.address}
            description={place.description}
            creatorId={place.creator}
            location={place.location}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default PlaceList;
