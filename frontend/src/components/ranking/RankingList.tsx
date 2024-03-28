import React from "react";
import RankingItem from "./RankingItem";
import { RankingsObject } from "../common/types";
import { removeRanking } from "../common/api";
import LoadingSpinner from "../common/LoadingSpinner";

interface RankingListProps {
  rankings: RankingsObject[];
  removeRankingItem: (ranking: RankingsObject) => void;
  isUserLoading: boolean;
}

const RankingList: React.FC<RankingListProps> = ({
  rankings,
  removeRankingItem,
  isUserLoading,
}) => {
  const handleRemoveAnime = (item: RankingsObject) => {
    removeRanking(item.id)
      .then((response) => {
        if (response) {
          removeRankingItem(item);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {(isUserLoading && <LoadingSpinner />) || (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-6">
            {rankings
              .sort((a, b) => b.ranking - a.ranking)
              .map((item: RankingsObject) => (
                <li
                  key={item.id}
                  className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                  <RankingItem
                    item={item}
                    handleRemoveAnime={handleRemoveAnime}
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default RankingList;
