import React, { useState } from "react";
import api from "../common/api";
import LoadingSpinner from "../common/LoadingSpinner";
import { UnsuccessfulResponse, SuccessfulUserResponse } from "../common/types";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  handleTokenChange: (token: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ handleTokenChange }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    setLoggingIn(true);
    setLoading(true);
    await api
      .post(apiUrl + "/api/login", credentials)
      .then((response) => {
        setLoggingIn(false);
        if (response.status === 200) {
          setErrorMessage("");
          const data = response.data as SuccessfulUserResponse;
          handleTokenChange(data.token);
          setLoading(false);
          navigate("/");
        }
      })
      .catch((error: AxiosError) => {
        setLoggingIn(false);
        if (error.response && error.response.status === 401) {
          const data = error.response.data as UnsuccessfulResponse;
          setErrorMessage(data.message);
          setLoading(false);
        }
        handleTokenChange(null);
      });
  };

  return (
    <div className="min-h-screen flex mt-8 justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => void handleSubmit(e)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div>
            <div className="rounded-md shadow-sm -space-y-px">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={credentials.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>
            {errorMessage && (
              <p className="mt-1 text-red-500 text-sm text-center">
                {errorMessage}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={loggingIn}
              aria-disabled={loggingIn}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm  rounded-md text-white bg-[#77625C] hover:bg-[#49392C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Login;
