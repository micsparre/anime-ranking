import axios, { AxiosError } from "axios";
import { RankingsObject, AnimeObject, User } from "./types";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    //Response Successful
    return response;
  },
  (error: AxiosError) => {
    console.error("Error from API:", error);
    if (error.response && error.response.status === 401) {
      //Unauthorized
      //redirect to Login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export async function getRankings(): Promise<RankingsObject[]> {
  const token = localStorage.getItem("token");
  if (!token) {
    return [];
  }
  try {
    const response = await api.get(apiUrl + "/api/rankings");
    const rankings = response.data as RankingsObject[];
    return rankings;
  } catch (error) {
    console.error("Error fetching user's rankings:", error);
    return [];
  }
}

export async function getBookmarks(): Promise<AnimeObject[]> {
  const token = localStorage.getItem("token");
  if (!token) {
    return [];
  }
  try {
    const response = await api.get(apiUrl + "/api/bookmarks");
    const bookmarks = response.data as AnimeObject[];
    return bookmarks;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return [];
  }
}

export async function getRecommendations(): Promise<AnimeObject[]> {
  try {
    const response = await api.get(apiUrl + "/api/recommendations");
    const recommendations = response.data as AnimeObject[];
    return recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}

export async function addRanking(
  newRankings: RankingsObject[]
): Promise<boolean> {
  try {
    await api.post(
      "/api/rank-item",
      newRankings.map((item) => ({
        item_id: item.id,
        ranking: item.ranking,
      }))
    );
    return true;
  } catch (error) {
    console.error("Error updating user's rankings:", error);
    return false;
  }
}

export async function removeRanking(id: number): Promise<boolean> {
  try {
    await api.post(apiUrl + "/api/rm-rankings-item", {
      item_id: id,
    });
    return true;
  } catch (error) {
    console.error("Error while removing from user's rankings:", error);
    return false;
  }
}

export async function addBookmark(id: number): Promise<boolean> {
  try {
    await api.post(apiUrl + "/api/add-bookmark", { item_id: id });
    return true;
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return false;
  }
}

export async function removeBookmark(id: number): Promise<boolean> {
  try {
    await api.post(apiUrl + "/api/rm-bookmark", {
      item_id: id,
    });
    return true;
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return false;
  }
}

export async function getSearchTitles(query: string): Promise<AnimeObject[]> {
  if (query.length < 3) {
    return [];
  }
  try {
    const response = await api.get(apiUrl + "/api/titles", {
      params: { title: query },
    });
    const searchResults = response.data as AnimeObject[];
    return searchResults;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}

export async function getUserDetails(): Promise<User> {
  try {
    const response = await api.get(apiUrl + "/api/user");
    const user = response.data as User;
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    localStorage.removeItem("token");
    window.location.href = "/login";
    return {} as User;
  }
}

export default api;
