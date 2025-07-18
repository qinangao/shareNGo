import { useEffect, useState } from "react";
import UsersList from "../components/user/UsersList";
import ErrorModal from "@/components/ErrorModal";
import { Spinner } from "@/components/Spinner";

function User() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const usersData = await response.json();

        if (!response.ok) {
          throw new Error(usersData.message || "Failed to fetch users");
        }

        setUsers(usersData.users);
      } catch (error) {
        setErrorMessage(error.message || "Something went wrong");
        setErrorModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);
  console.log(users);
  return (
    <>
      <div className="py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl py-2 sm:text-5xl font-bold bg-gradient-to-r from-brand-300 to-purple-300 bg-clip-text text-transparent mb-4">
            Discover Amazing Places
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore incredible destinations shared by our community of travelers
          </p>
        </div>
        {isLoading && <Spinner size="large" />}
        {!isLoading && !errorMessage && users && <UsersList users={users} />}
      </div>

      <ErrorModal
        open={errorModalOpen}
        message={errorMessage}
        onClose={() => setErrorModalOpen(false)}
      />
    </>
  );
}

export default User;
