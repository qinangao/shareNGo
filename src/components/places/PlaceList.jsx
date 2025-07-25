import { Button } from "@/components/ui/button";
import PlaceItem from "./PlaceItem";
import { Link } from "react-router";
import LinkButton from "../LinkButton";
import { ArrowLeft } from "lucide-react";

function PlaceList({ places, onDelete, isCurrentUser = false }) {
  const hasPlaces = places && places.length > 0;

  return (
    <div className="container">
      <h1 className="title">{isCurrentUser ? "Your Places" : "Places"}</h1>

      {/* Back to Community link (always shown) */}
      <Link to="/user">
        <LinkButton className="flex items-center my-8">
          <ArrowLeft />
          <span className="ml-2">Back to Community</span>
        </LinkButton>
      </Link>

      {!hasPlaces ? (
        <div className="error_container text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-8">
            {isCurrentUser
              ? "You haven't posted any places yet."
              : "This user hasn't posted any places."}
          </h2>
          {isCurrentUser && (
            <Link to="/places/new">
              <Button variant="default">Share place</Button>
            </Link>
          )}
        </div>
      ) : (
        <ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
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
      )}
    </div>
  );
}

export default PlaceList;
