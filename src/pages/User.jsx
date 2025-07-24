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
    <>
      {isLoading && <Spinner size="large" />}
      <div className="container">
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
