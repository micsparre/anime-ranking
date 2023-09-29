// src/components/AnimeList/Recommendation.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.get(apiUrl + "/api/recommendations/");
        if (response.status === 200) {
          setRecommendations(response.data.recommendations);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      {" "}
      <h4>Recommendations</h4>
      <ul>
        {recommendations.map((animeTitle) => (
          <li key={animeTitle}>animeTitle</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;
