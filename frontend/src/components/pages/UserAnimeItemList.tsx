import React, { useState, useEffect } from "react";
import UserAnimeItem from "../common/UserAnimeItem";
import { UserAnimeObject } from "../common/types";
import api from "../common/api";

const UserAnimeList: React.FC = () => {
  const [animeList, setAnimeList] = useState<UserAnimeObject[]>([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;

      await api
        .get(apiUrl + "/api/anime-list")
        .then((response) => {
          if (response.status === 200) {
            setAnimeList(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching anime list:", error);
        });
    };

    fetchAnimeList();
  }, []);

  const handleRemoveAnime = (item: UserAnimeObject) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { anime_id: item.id };
    api
      .post(apiUrl + "/api/remove-anime-from-list", itemData)
      .then((response) => {
        setAnimeList(
          animeList.filter((anime: UserAnimeObject) => anime.id !== item.id)
        );
      })
      .catch((error) => {
        console.error("Error fetching item removed details:", error);
      });
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-6">
          {animeList.map((item: UserAnimeObject) => (
            <li
              key={item.id}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <UserAnimeItem
                item={item}
                handleRemoveAnime={handleRemoveAnime}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserAnimeList;
