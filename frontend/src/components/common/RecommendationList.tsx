import React from "react";
import { UserAnimeObject, AnimeObject } from "./types";
import api from "./api";
import RecommendationItem from "./RecommendationItem";
import { addBookmark, removeBookmark } from "./bookmark";

interface RecommendationListProps {
  recommendations: UserAnimeObject[];
  animeList: AnimeObject[];
  bookmarks: AnimeObject[];
  setAnimeList: React.Dispatch<React.SetStateAction<AnimeObject[]>>;
  setBookmarks: React.Dispatch<React.SetStateAction<AnimeObject[]>>;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  animeList,
  bookmarks,
  setAnimeList,
  setBookmarks,
}) => {
  const isAnimeAdded = (anime: AnimeObject) => {
    return animeList.some((item) => item.id === anime.id);
  };

  const isBookmarkAdded = (anime: AnimeObject) => {
    return bookmarks.some((item) => item.id === anime.id);
  };

  const handleAddAnime = (item: AnimeObject) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { anime_id: item.id, title: item.title };

    api
      .post(apiUrl + "/api/add-anime-to-list", itemData)
      .then((response) => {
        setAnimeList([...animeList, item]);
      })
      .catch((error) => {
        console.error("Error fetching item created details:", error);
      });
  };

  const handleRemoveAnime = (item: AnimeObject) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { anime_id: item.id };
    api
      .post(apiUrl + "/api/remove-anime-from-list", itemData)
      .then((response) => {
        setAnimeList(animeList.filter((anime) => anime.id !== item.id));
      })
      .catch((error) => {
        console.error("Error fetching item removed details:", error);
      });
  };

  const handleRemoveBookmark = async (item: AnimeObject) => {
    const itemId = item.id;
    const response = await removeBookmark(itemId);
    if (response) {
      setBookmarks(bookmarks.filter((anime) => anime.id !== item.id));
    }
  };

  const handleAddBookmark = async (item: AnimeObject) => {
    const itemId = item.id;
    const response = await addBookmark(itemId);
    if (response) {
      setBookmarks([...bookmarks, item]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-6">
        {recommendations.map((item: UserAnimeObject) => (
          <li
            key={item.id}
            className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <RecommendationItem
              item={item}
              isAdded={isAnimeAdded(item)}
              isBookmarked={isBookmarkAdded(item)}
              handleRemoveAnime={handleRemoveAnime}
              handleAddAnime={handleAddAnime}
              handleAddBookmark={handleAddBookmark}
              handleRemoveBookmark={handleRemoveBookmark}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationList;
