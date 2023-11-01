// src/components/AnimeList/Bookmark.tsx
import React, { useEffect, useState } from "react";
import { UserAnimeObject } from "../common/types";
import api from "../common/api";
import { AnimeObject } from "../common/types";
import LoadingSpinner from "../common/LoadingSpinner";
import BookmarkList from "../common/BookmarkList";

const Bookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<UserAnimeObject[]>([]);
  const [animeList, setAnimeList] = useState<AnimeObject[]>([]);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const response = await api.get(apiUrl + "/api/bookmarks");
        if (response.status === 200) {
          setBookmarks(response.data);
          console.log("bookmarks", response.data);
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
      setLoading(false);
    };

    const fetchAnimeList = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const response = await api.get(apiUrl + "/api/anime-list");
        if (response.status === 200) {
          setAnimeList(response.data);
          // if anime in anime list, remove it from bookmarks (server side?)
          console.log("bookmarks before", bookmarks);
          setBookmarks(
            bookmarks.filter(
              (anime: UserAnimeObject) =>
                !response.data.some((item: AnimeObject) => item.id === anime.id)
            )
          );
          console.log("bookmarks after", bookmarks);
        }
      } catch (error) {
        console.error("Error fetching anime list:", error);
      }
    };

    fetchBookmarks();
    fetchAnimeList();
    // eslint-disable-next-line
  }, []);

  return (
    (loading && <LoadingSpinner />) || (
      <div className="bg-gray-100 min-h-screen">
        <BookmarkList
          bookmarks={bookmarks}
          animeList={animeList}
          setAnimeList={setAnimeList}
        />
      </div>
    )
  );
};

export default Bookmarks;
