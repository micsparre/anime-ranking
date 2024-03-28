import React from "react";
import RankingList from "./RankingList";
import { RankingsObject } from "../common/types";

interface RankingsProps {
  rankings: RankingsObject[];
  removeRankingItem: (ranking: RankingsObject) => void;
  isUserLoading: boolean;
}

const Rankings: React.FC<RankingsProps> = ({
  rankings,
  removeRankingItem,
  isUserLoading,
}) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <RankingList
        rankings={rankings}
        removeRankingItem={removeRankingItem}
        isUserLoading={isUserLoading}
      />
    </div>
  );
};

export default Rankings;
