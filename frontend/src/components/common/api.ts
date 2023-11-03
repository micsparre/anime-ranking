import axios from "axios";
import { UserAnimeObject, AnimeObject } from "./types";

const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export async function getUserAnimeList(): Promise<UserAnimeObject[]> {
  try {
    const response = await api.get(apiUrl + "/api/anime-list");
    const userAnimeList = response.data as UserAnimeObject[];
    return userAnimeList;
  } catch (error) {
    console.error("Error fetching user's anime list:", error);
    return [];
  }
}

export async function getUserBookmarks(): Promise<AnimeObject[]> {
  try {
    const response = await api.get(apiUrl + "/api/bookmarks");
    const userBookmarks = response.data as AnimeObject[];
    return userBookmarks;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return [];
  }
}

export default api;
