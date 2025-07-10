import UserItem from "./UserItem";

function UsersList({ users }) {
  if (users.length === 0) {
    return (
      <div className="error_container">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            No users found
          </h2>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {users.map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.numOfPlaces}
          />
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
