import { useState, useEffect } from "react";
import { User } from "../common/types";
import { getUser } from "../common/api";
import LoadingSpinner from "../common/LoadingSpinner";

const Account = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    window.location.href = "/login";
    setLoading(true);
    setUser(undefined);
    localStorage.clear();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      getUser().then((response) => {
        setLoading(false);
        setUser(response);
      });
    }
  }, []);

  return (
    <>
      {(loading && <LoadingSpinner />) || (
        <div className="flex flex-col items-center h-screen py-20">
          <h1 className="text-3xl font-bold mb-4">Hello {user?.username}!</h1>
          <p className="mb-4">
            <strong>Full Name:</strong> {user?.first_name} {user?.last_name}
          </p>
          <p className="mb-4">
            <strong>Username:</strong> {user?.username}
          </p>
          <p className="mb-4">
            <strong>Email:</strong> {user?.email}
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default Account;
