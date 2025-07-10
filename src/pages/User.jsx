import UsersList from "../components/user/UsersList";

function User() {
  const USER = [
    {
      id: "u1",
      name: "John Doe",
      image:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740",
      numOfPlaces: 3,
    },
  ];
  return (
    <div className="flex justify-center items-center px-4 py-8">
      <UsersList users={USER} />
    </div>
  );
}

export default User;
