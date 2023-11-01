import api from "./api";

export const addBookmark = async (itemId: number) => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  if (!isLoggedIn) {
    return false;
  }
  const apiUrl = process.env.REACT_APP_API_URL;
  api
    .post(apiUrl + "/api/add-bookmark", { anime_id: itemId })
    .then((response) => {})
    .catch((error) => {
      console.error("Error fetching bookmark added details:", error);
    });
  return true;
};

export const removeBookmark = async (itemId: number) => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  if (!isLoggedIn) {
    return false;
  }
  const apiUrl = process.env.REACT_APP_API_URL;
  api
    .post(apiUrl + "/api/remove-bookmark", { anime_id: itemId })
    .then((response) => {})
    .catch((error) => {
      console.error("Error fetching bookmark added details:", error);
    });
  return true;
};
