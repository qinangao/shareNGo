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
      {isLoading && <Spinner size="large" />}
      <h1 className="title">Community</h1>
      <p className="text-center md:text-lg text-dark-50">
        Curious what everyone else is sharing? Dive in and see what your fellow
        scrollers are posting!
      </p>

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
