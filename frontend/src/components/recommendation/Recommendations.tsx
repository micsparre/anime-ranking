import React, { useState } from "react";
import { RankingsObject, AnimeObject } from "../common/types";
import { getRecommendations } from "../common/api";
import LoadingSpinner from "../common/LoadingSpinner";
import RecommendationList from "./RecommendationList";

interface RecommendationsProps {
  rankings: RankingsObject[];
  bookmarks: AnimeObject[];
  recommendations: AnimeObject[];
  appendRankingItem: (ranking: RankingsObject) => void;
  appendBookmarksItem: (bookmark: AnimeObject) => void;
  removeBookmarksItem: (bookmark: AnimeObject) => void;
  handleRecommendationsChange: (recs: AnimeObject[]) => void;
  isUserLoading: boolean;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  rankings,
  bookmarks,
  recommendations,
  appendRankingItem,
  appendBookmarksItem,
  removeBookmarksItem,
  handleRecommendationsChange,
  isUserLoading,
}) => {
  const [isRecommendationsLoading, setIsRecommendationsLoading] =
    useState(false);

  const fetchRecommendations = () => {
    setIsRecommendationsLoading(true);
    getRecommendations()
      .then((response) => {
        handleRecommendationsChange(response);
        setIsRecommendationsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsRecommendationsLoading;
      });
  };

  return (
    ((isUserLoading || isRecommendationsLoading) && <LoadingSpinner />) || (
      <div className="bg-gray-100 min-h-screen">
        <RecommendationList
          recommendations={recommendations}
          rankings={rankings}
          bookmarks={bookmarks}
          appendRankingItem={appendRankingItem}
          appendBookmarksItem={appendBookmarksItem}
          removeBookmarksItem={removeBookmarksItem}
        />
        <div className="flex flex-col items-center h-screen">
          <button
            className="bg-[#77625C] hover:bg-[#49392C] text-white font-bold py-2 px-4 rounded"
            onClick={fetchRecommendations}
          >
            Generate Recommendations!
          </button>
        </div>
      </div>
    )
  );
};

export default Recommendations;
