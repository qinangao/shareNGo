import { useParams } from "react-router";
import PlaceList from "../components/places/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzMnNyQjI5LDUexeUDV92SXnYSISARRYsMUKZmZPlwFEK_-BjeXbEchorS41RugzL7X2k&usqp=CAU",
    title: "South Park",
    address: "Park Vale Rd, Macclesfield SK11 8AD",
    description:
      "South Park is a friendly neighbourhood in Macclesfield, England, known for its community spirit and walkability.",
    creator: "u1",
    location: { lat: 53.2509364, lng: -2.1320182 },
  },
  {
    id: "p2",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzMnNyQjI5LDUexeUDV92SXnYSISARRYsMUKZmZPlwFEK_-BjeXbEchorS41RugzL7X2k&usqp=CAU",
    title: "West Park",
    address: "Park Vale Rd, Macclesfield SK11 8AD",
    description:
      "South Park is a friendly neighbourhood in Macclesfield, England, known for its community spirit and walkability.",
    creator: "u2",
    location: { lat: 53.2509364, lng: -2.1320182 },
  },
];

function UserPlaces() {
  const userId = useParams().userId;

  const currentUserPlaces = DUMMY_PLACES.filter(
    (place) => place.creator === userId
  );

  return <PlaceList places={currentUserPlaces} />;
}

export default UserPlaces;
