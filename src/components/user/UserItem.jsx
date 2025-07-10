import { Link } from "react-router";
import Avatar from "../Avatar";

function UserItem({ id, image, name, placeCount }) {
  return (
    <li className="w-full max-w-sm">
      <Link to={`/${id}/places`}>
        <Avatar image={image} name={name} placeCount={placeCount} />
      </Link>
    </li>
  );
}

export default UserItem;
