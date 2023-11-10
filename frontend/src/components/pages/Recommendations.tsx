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
    const fetchRecommendations = () => {
      setLoading(true);
      getRecommendations().then((response) => {
        setRecommendations(response);
        setLoading(false);
      });
    };

    fetchRecommendations();
    getUserAnimeList().then((response) => {
      setAnimeList(response);
      setRecommendations(
        recommendations.filter(
          (anime: AnimeObject) =>
            !response.some((item: AnimeObject) => item.id === anime.id)
        )
      );
    });
    // eslint-disable-next-line
  }, []);

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
      </div>
    )
  );
};

export default Recommendations;
