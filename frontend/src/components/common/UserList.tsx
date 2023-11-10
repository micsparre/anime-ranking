import React, { useState, useEffect } from "react";
import UserItem from "./UserItem";
import { UserAnimeObject } from "./types";
import { removeUserAnime, getUserAnimeList } from "./api";

const UserList: React.FC = () => {
  const [animeList, setAnimeList] = useState<UserAnimeObject[]>([]);

  useEffect(() => {
    getUserAnimeList().then((response) => {
      setAnimeList(response);
    });
  }, []);

  const handleRemoveAnime = (item: UserAnimeObject) => {
    removeUserAnime(item.id).then((response) => {
      if (response) {
        setAnimeList(
          animeList.filter((anime: UserAnimeObject) => anime.id !== item.id)
        );
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-6">
        {animeList
          .sort((a, b) => b.ranking - a.ranking)
          .map((item: UserAnimeObject) => (
            <li
              key={item.id}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <UserItem item={item} handleRemoveAnime={handleRemoveAnime} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
