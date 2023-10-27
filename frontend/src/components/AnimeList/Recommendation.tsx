// src/components/AnimeList/Recommendation.tsx
import React, { useEffect, useState } from "react";
import { AnimeListItem } from "../Shared/Types";
import { FaTimes } from "react-icons/fa";
import api from "../Shared/api";
import getDescription from "../Shared/Anime";
import { Anime } from "../Shared/Types";
import { FaSpinner, FaCheck } from "react-icons/fa";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState<AnimeListItem[]>([]);
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [addAnimeLoading, setAddAnimeLoading] = useState<Anime>();
  const [loading, setLoading] = useState(false);

  const isAnimeAdded = (anime: Anime) => {
    return animeList.some((item) => item.id === anime.id);
  };

  const onItemClickAdd = (item: Anime) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { anime_id: item.id, title: item.title };

    setAddAnimeLoading(item);
    api
      .post(apiUrl + "/api/add-anime-to-list", itemData)
      .then((response) => {
        setAnimeList([...animeList, item]);
      })
      .catch((error) => {
        console.error("Error fetching item created details:", error);
      });
  };

  const onItemClickRemove = (item: Anime) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { anime_id: item.id };
    setAddAnimeLoading(item);
    api
      .post(apiUrl + "/api/remove-anime-from-list", itemData)
      .then((response) => {
        setAnimeList(animeList.filter((anime) => anime.id !== item.id));
      })
      .catch((error) => {
        console.error("Error fetching item removed details:", error);
      });
    setAddAnimeLoading(undefined);
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const response = await api.get(apiUrl + "/api/recommendations");
        if (response.status === 200) {
          setRecommendations(response.data);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  const handleRemoveAnime = (item: AnimeListItem) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { anime_id: item.id };
    api
      .post(apiUrl + "/api/remove-anime-from-list", itemData)
      .then((response) => {
        setRecommendations(
          recommendations.filter((anime: AnimeListItem) => anime.id !== item.id)
        );
      })
      .catch((error) => {
        console.error("Error fetching item removed details:", error);
      });
  };

  return (
    (loading && (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )) || (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-6">
            {recommendations.map((anime: AnimeListItem) => (
              <li
                key={anime.id}
                className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">
                        {anime.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {getDescription(anime)}
                    </p>
                  </div>
                  <div className="ml-auto flex mt-1">
                    {isAnimeAdded(anime) ? (
                      <button
                        onClick={() => onItemClickRemove(anime)}
                        className="bg-green-500 hover:bg-red-700 text-white font-bold px-4 rounded flex items-center justify-center h-10 w-10"
                      >
                        <FaCheck />
                      </button>
                    ) : addAnimeLoading === anime ? (
                      <FaSpinner className="w-10 h-10 text-blue-500 animate-spin" />
                    ) : (
                      <button
                        onClick={() => onItemClickAdd(anime)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center h-10 w-10"
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default Recommendation;
