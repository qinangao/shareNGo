import { useEffect, useState } from "react";
import UsersList from "../components/user/UsersList";
import ErrorModal from "@/components/ErrorModal";
import { Spinner } from "@/components/Spinner";
import useHttp from "@/hooks/useHttp";
import { BACKEND_URL } from "@/utils/constants";

function User() {
  const [users, setUsers] = useState(null);

  const { isLoading, errorMessage, errorModalOpen, sendRequest, clearError } =
    useHttp();

  useEffect(() => {
    async function fetchUsers() {
      const data = await sendRequest(`${BACKEND_URL}/users`);
      if (data && data.users) {
        setUsers(data.users);
      }
    }

    fetchUsers();
  }, [sendRequest]);

  return (
    <div className="container">
      <h1 className="title">Community</h1>
      <p className="text-center md:text-lg text-dark-50">
        Curious what everyone else is sharing? Dive in and see what your fellow
        scrollers are posting!
      </p>

      {isLoading && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded md:w-[40%] mx-auto mt-6">
          <p className="text-yellow-700 text-center">
            Server is waking up. Please wait a moment...
          </p>
          <Spinner size="large" />
        </div>
      )}

      {!isLoading && !errorMessage && users && <UsersList users={users} />}

      <ErrorModal
        open={errorModalOpen}
        message={errorMessage}
        onClose={clearError}
      />
    </div>
  );
}

export default User;
