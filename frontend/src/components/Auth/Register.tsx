import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../Shared/api";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
}

interface UsernameAvailability {
  exists: boolean;
}

const Register = () => {
  const [user, setUser] = useState<User>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState<Partial<User>>({});
  const [creatingUser, setCreatingUser] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // added async keyword
    event.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    const newErrors: Partial<User> = {};

    if (!user.first_name) {
      newErrors.first_name = "First name is required.";
    } else if (user.first_name.length > 20) {
      newErrors.first_name = "First name must be less than 20 characters.";
    }

    if (!user.last_name) {
      newErrors.last_name = "Last name is required.";
    } else if (user.last_name.length > 20) {
      newErrors.last_name = "Last name must be less than 20 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!user.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(user.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.";
    }

    if (!user.username) {
      newErrors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9]{3,}$/.test(user.username)) {
      newErrors.username =
        "Username must be at least 3 characters long and can only contain alphanumeric characters.";
    } else if (user.username.length > 20) {
      newErrors.username = "Username must be less than 15 characters.";
    } else {
      await api
        .get(apiUrl + `/api/get-username?username=${user.username}`)
        .then((response) => {
          const usernameAvailability = response.data as UsernameAvailability;
          if (usernameAvailability.exists) {
            newErrors.username = "Username already exists.";
          }
        })
        .catch((error) => {
          console.error("Error fetching username availibility:", error);
        });
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Submitting form:", user);

      try {
        setCreatingUser(true);
        const response = await api.post(apiUrl + "/api/register", user);
        setCreatingUser(false);
        if (response.status === 201) {
          setRegistrationSuccess(true);
          console.log("Successful registration", response.data);
        } else {
          // Handle registration error
          // ...
          console.log("Registration error", response.data);
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" bg-white p-10 rounded-lg shadow-lg max-w-md w-full space-y-8">
        {registrationSuccess ? (
          <div className="flex flex-col items-center">
            <div className="text-green-500 font-bold text-center">
              Account created successfully!
            </div>
            <button className="mt-5 bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300">
              <Link to="/login" className="text-white">
                Proceed to login
              </Link>
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-5">Sign up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="first_name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={user.first_name}
                  onChange={handleInputChange}
                  className="border rounded-lg py-2 px-3 w-full"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm">{errors.first_name}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="last_name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={user.last_name}
                  onChange={handleInputChange}
                  className="border rounded-lg py-2 px-3 w-full"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm">{errors.last_name}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="border rounded-lg py-2 px-3 w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  className="border rounded-lg py-2 px-3 w-full"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  className="border rounded-lg py-2 px-3 w-full"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={creatingUser}
                aria-disabled={creatingUser}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
