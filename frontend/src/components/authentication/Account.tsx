import React from "react";
import { User } from "../common/types";
import LoadingSpinner from "../common/LoadingSpinner";
import { useNavigate } from "react-router-dom";

interface AccountProps {
  handleTokenChange: (token: string | null) => void;
  userDetails: User;
  isUserLoading: boolean;
}

const Account: React.FC<AccountProps> = ({
  handleTokenChange,
  userDetails,
  isUserLoading,
}) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate("/login");
    handleTokenChange(null);
  };
  if (!userDetails) {
    return (
      (isUserLoading && <LoadingSpinner />) || (
        <div className="flex flex-col items-center h-screen py-20 bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              navigate("/login");
              handleTokenChange(null);
            }}
          >
            Sign In
          </button>
        </div>
      )
    );
  }

  return (
    (isUserLoading && <LoadingSpinner />) || (
      <div className="flex flex-col items-center h-screen py-20 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">
          Hello {userDetails.username}!
        </h1>
        <p className="mb-4">
          <strong>Full Name:</strong> {userDetails.first_name}{" "}
          {userDetails.last_name}
        </p>
        <p className="mb-4">
          <strong>Username:</strong> {userDetails.username}
        </p>
        <p className="mb-4">
          <strong>Email:</strong> {userDetails.email}
        </p>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    )
  );
};

export default Account;
