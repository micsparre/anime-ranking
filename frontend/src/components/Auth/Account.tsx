import React, { useState, useEffect } from "react";
import { User } from "../Shared/Types";
import api from "../Shared/api";

const Account = () => {
  const [user, setUser] = useState<User>();

  const handleSignOut = async () => {
    setUser(undefined);
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const apiUrl = process.env.REACT_APP_API_URL;
      api
        .get(apiUrl + "/api/get-user-info")
        .then((response) => {
          const userData = response.data as User;
          setUser(userData);
        })
        .catch((error) => {
          console.error("Failed to get user details", error);
        });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
  );
};

export default Account;
