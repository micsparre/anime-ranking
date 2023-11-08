// src/components/AnimeList/Recommendation.tsx
import React, { useEffect, useState } from "react";
import { UserAnimeObject, AnimeObject } from "../common/types";
import api from "../common/api";
import LoadingSpinner from "../common/LoadingSpinner";
import RecommendationList from "../common/RecommendationList";

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<UserAnimeObject[]>([]);
  const [animeList, setAnimeList] = useState<UserAnimeObject[]>([]);
  const [bookmarks, setBookmarks] = useState<AnimeObject[]>([]);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const response = await api.get(apiUrl + "/api/recommendations");
        if (response.status === 200) {
          setRecommendations(response.data);
          console.log("recommendations", response.data);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
      setLoading(false);
    };

    const fetchAnimeList = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const response = await api.get(apiUrl + "/api/anime-list");
        if (response.status === 200) {
          setAnimeList(response.data);
          // if anime in anime list, remove it from recommendations (server side?)
          console.log("recommendations before", recommendations);
          setRecommendations(
            recommendations.filter(
              (anime: UserAnimeObject) =>
                !response.data.some((item: AnimeObject) => item.id === anime.id)
            )
          );
          console.log("recommendations after", recommendations);
        }
      } catch (error) {
        console.error("Error fetching anime list:", error);
      }
    };

    fetchRecommendations();
    fetchAnimeList();
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
