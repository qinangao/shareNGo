import { Button } from "@/components/ui/button";
import PlaceItem from "./PlaceItem";

function PlaceList({ places }) {
  if (!places || places.length === 0) {
    return (
      <div className="error_container">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-[30px]">
            No places found. Maybe create one?
          </h2>
          <Button variant="default">Share place</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
          />
        ))}
      </ul>
    </div>
  );
}

export default PlaceList;
