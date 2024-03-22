import React, { useState, useEffect } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { User } from "../common/types";
import { getUser } from "../common/api";

interface AccountProps {
  handleTokenChange: (token: string | null) => void;
}

const Account: React.FC<AccountProps> = ({ handleTokenChange }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);
    getUser()
      .then((response) => {
        setUser(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSignOut = () => {
    window.location.href = "/login";
    setLoading(true);
    handleTokenChange(null);
  };

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
