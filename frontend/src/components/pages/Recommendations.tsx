import React, { useEffect, useState } from "react";
import { UserAnimeObject, AnimeObject } from "../common/types";
import { getUserAnimeList, getRecommendations } from "../common/api";
import LoadingSpinner from "../common/LoadingSpinner";
import RecommendationList from "../common/RecommendationList";

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<AnimeObject[]>([]);
  const [animeList, setAnimeList] = useState<UserAnimeObject[]>([]);
  const [bookmarks, setBookmarks] = useState<AnimeObject[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserAnimeList()
      .then((response) => {
        setAnimeList(response);
        setRecommendations((r) =>
          r.filter(
            (anime: AnimeObject) =>
              !response.some((item: AnimeObject) => item.id === anime.id)
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchRecommendations = () => {
    setLoading(true);
    getRecommendations()
      .then((response) => {
        setRecommendations(
          response.filter(
            (anime: AnimeObject) =>
              !animeList.some((item: AnimeObject) => item.id === anime.id)
          )
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    (loading && <LoadingSpinner />) || (
      <div className="bg-gray-100 min-h-screen">
        <RecommendationList
          recommendations={recommendations}
          animeList={animeList}
          bookmarks={bookmarks}
          setAnimeList={setAnimeList}
          setBookmarks={setBookmarks}
        />
        <div className="flex flex-col items-center h-screen">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={fetchRecommendations}
          >
            Generate Recommendations!
          </button>
        </div>
      </div>
    )
  );
};

export default Recommendations;
