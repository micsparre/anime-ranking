import React, { useEffect, useState } from "react";
import { AnimeListItem } from "../Shared/Types";
import { FaTimes } from "react-icons/fa";
import api from "../Shared/api";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;

      await api
        .get(apiUrl + "/api/anime-list")
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setAnimeList(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchAnimeList();
  }, []);

  const handleRemoveAnime = (item: AnimeListItem) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { anime_id: item.id };
    api
      .post(apiUrl + "/api/remove-anime-from-list", itemData)
      .then((response) => {
        setAnimeList(
          animeList.filter((anime: AnimeListItem) => anime.id !== item.id)
        );
      })
      .catch((error) => {
        console.error("Error fetching item removed details:", error);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h4 className="text-3xl font-bold">Anime List</h4>
        <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {animeList.map((anime: AnimeListItem) => (
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
                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      {anime.ranking}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {"test"}
                  </p>
                </div>
                <button
                  className="bg-gray-300 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center justify-center h-6 w-6"
                  onClick={() => handleRemoveAnime(anime)}
                >
                  <FaTimes />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnimeList;
