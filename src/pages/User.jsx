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
    <div className="py-12 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl py-2 sm:text-5xl font-bold bg-gradient-to-r from-brand-300 to-purple-300 bg-clip-text text-transparent mb-4">
          Discover Amazing Places
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore incredible destinations shared by our community of travelers
        </p>
      </div>
      <UsersList users={USER} />
    </div>
  );
}

export default User;
