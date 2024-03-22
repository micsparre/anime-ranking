import React, { useEffect, useState } from "react";
import { getUserAnimeList, getUserBookmarks } from "../common/api";
import { UserAnimeObject, AnimeObject } from "../common/types";
import LoadingSpinner from "../common/LoadingSpinner";
import BookmarkList from "../common/BookmarkList";

const Bookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<AnimeObject[]>([]);
  const [animeList, setAnimeList] = useState<UserAnimeObject[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserBookmarks()
      .then((response) => {
        setBookmarks(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    getUserAnimeList()
      .then((response) => {
        setAnimeList(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    (loading && <LoadingSpinner />) || (
      <div className="bg-gray-100 min-h-screen">
        <BookmarkList
          bookmarks={bookmarks}
          animeList={animeList}
          setBookmarks={setBookmarks}
          setAnimeList={setAnimeList}
        />
      </div>
    )
  );
};

export default Bookmarks;
