// src/components/AnimeList/Recommendation.tsx
import React, { useEffect, useState } from "react";
import api from "../Shared/api";

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const response = await api.get(apiUrl + "/api/recommendations");
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
    <div className="py-6 bg-gray-100 min-h-screen mt-8">
      <h4 className="text-3xl font-bold">Recommendations</h4>
      <ul>
        {recommendations.map((animeTitle) => (
          <li key={animeTitle}>animeTitle</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;
