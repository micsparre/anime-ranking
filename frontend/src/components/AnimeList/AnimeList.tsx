import React, { useEffect, useState } from "react";
import { AnimeListItem } from "../Shared/Types";
import api from "../Shared/api";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await api.get(apiUrl + "/api/anime-list");
        if (response.status === 200) {
          setAnimeList(response.data);
        }
      } catch (error) {
        console.error("Error fetching anime list:", error);
      }
    };

    fetchAnimeList();
  }, []);

  return (
    <div>
      <h4>Anime List</h4>
      Anime List
      <ul>
        {animeList.map((anime: AnimeListItem) => (
          <li key={anime.id}>
            Title: {anime.title} Ranking: {anime.ranking}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeList;
