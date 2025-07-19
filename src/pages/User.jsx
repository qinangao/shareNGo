import { useEffect, useState } from "react";
import UsersList from "../components/user/UsersList";
import ErrorModal from "@/components/ErrorModal";
import { Spinner } from "@/components/Spinner";
import useHttp from "@/hooks/useHttp";

function User() {
  const [users, setUsers] = useState(null);

  const { isLoading, errorMessage, errorModalOpen, sendRequest, clearError } =
    useHttp();

  useEffect(() => {
    async function fetchUsers() {
      const data = await sendRequest("http://localhost:5000/api/users");
      if (data && data.users) {
        setUsers(data.users);
      }
    }

    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      {isLoading && <Spinner size="large" />}
      <div className="py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl py-2 sm:text-5xl font-bold bg-gradient-to-r from-brand-300 to-purple-300 bg-clip-text text-transparent mb-4">
            Discover Amazing Places
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore incredible destinations shared by our community of travelers
          </p>
        </div>

        {!isLoading && !errorMessage && users && <UsersList users={users} />}
      </div>

      <ErrorModal
        open={errorModalOpen}
        message={errorMessage}
        onClose={clearError}
      />
    </>
  );
}

export default User;
