// src/components/AnimeList/AnimeList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Anime } from "../Shared/Types";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(apiUrl + "/api/anime-list/");
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
        {animeList.map((anime: Anime) => (
          <li key={anime.id}>anime.title</li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeList;
