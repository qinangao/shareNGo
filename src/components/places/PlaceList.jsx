import Button from "../Button";
import PlaceItem from "./PlaceItem";

function PlaceList({ places }) {
  if (places.length === 0) {
    return (
      <div className="error_container">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-[30px]">
            No places found. Maybe create one?
          </h2>
          <Button variant="primary">Share place</Button>
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
            image={place.imageUrl}
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
