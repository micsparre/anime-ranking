// src/components/AnimeList/Recommendation.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const apiUrl = 'http://localhost:8000/api/get-recommendations/'
      try {
        const response = await axios.get('/api/recommendations/');
        if (response.status === 200) {
          setRecommendations(response.data.recommendations);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">
        Recommendations
      </Typography>
      <List>
        {recommendations.map((animeTitle) => (
          <ListItem key={animeTitle}>
            <ListItemText primary={animeTitle} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Recommendation;
