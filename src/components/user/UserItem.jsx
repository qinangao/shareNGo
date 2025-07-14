import { Link } from "react-router";
import Avatar from "../Avatar";

function UserItem({ id, image, name, placeCount }) {
  return (
    <Link to={`/${id}/places`} className="group block">
      <Avatar image={image} name={name} placeCount={placeCount} />
    </Link>
  );
}

export default UserItem;
