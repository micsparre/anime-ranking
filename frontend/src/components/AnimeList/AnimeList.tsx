// src/components/AnimeList/AnimeList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Anime } from '../Shared/Types';

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(apiUrl + '/api/anime-list/');
        if (response.status === 200) {
          setAnimeList(response.data);
        }
      } catch (error) {
        console.error('Error fetching anime list:', error);
      }
    };

    fetchAnimeList();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">
        Anime List
      </Typography>
      <List>
        {animeList.map((anime : Anime) => (
          <ListItem key={anime.id}>
            <ListItemText primary={anime.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AnimeList;
