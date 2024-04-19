import React, { useState } from "react";
import { RankingsObject, AnimeObject } from "../common/types";
import RecommendationItem from "./RecommendationItem";
import { addBookmark, removeBookmark } from "../common/api";
import RankingModal from "../ranking/RankingModal";

interface RecommendationListProps {
  recommendations: AnimeObject[];
  rankings: RankingsObject[];
  bookmarks: AnimeObject[];
  appendRankingItem: (ranking: RankingsObject) => void;
  appendBookmarksItem: (bookmark: AnimeObject) => void;
  removeBookmarksItem: (bookmark: AnimeObject) => void;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  rankings,
  bookmarks,
  appendRankingItem,
  appendBookmarksItem,
  removeBookmarksItem,
}) => {
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [rankingItem, setRankingItem] = useState<RankingsObject>(
    {} as RankingsObject
  );
  const isItemRanked = (item: AnimeObject) => {
    return rankings.some((ranking) => ranking.id === item.id);
  };

  const isItemBookmarked = (item: AnimeObject) => {
    return bookmarks.some((bookmark) => bookmark.id === item.id);
  };

  const handleRemoveBookmark = async (item: AnimeObject) => {
    const itemId = item.id;
    const response = await removeBookmark(itemId);
    if (!response) {
      return false;
    }
    removeBookmarksItem(item);
    return true;
  };

  const handleAddBookmark = async (item: AnimeObject) => {
    const itemId = item.id;
    appendBookmarksItem(item);
    const response = await addBookmark(itemId);
    if (!response) {
      removeBookmarksItem(item);
      return false;
    }
    return true;
  };

  const openRankingModal = (item: AnimeObject) => {
    if (!item) {
      return false;
    }
    setRankingItem({ ...item, ranking: 0 } as RankingsObject);
    setShowRankingModal(true);
    return true;
  };

  const closeRankingModal = async () => {
    // TODO get ranking from rankingmodal object?
    try {
      const isBookmarked = isItemBookmarked(rankingItem);
      if (isBookmarked) {
        await handleRemoveBookmark(rankingItem);
      }
      setShowRankingModal(false);
      appendRankingItem(rankingItem);
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
    return true;
  };

  return (
    <>
      {showRankingModal && (
        <RankingModal
          item={rankingItem}
          rankings={rankings}
          onClose={closeRankingModal}
        />
      )}
      <div className="max-w-8xl mx-auto pt-10 sm:px-6 lg:px-8">
        <ul className="pt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-6">
          {recommendations.map((item: AnimeObject) => (
            <li
              key={item.id}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <RecommendationItem
                item={item}
                isRanked={isItemRanked(item)}
                isBookmarked={isItemBookmarked(item)}
                handleAddAnime={openRankingModal}
                handleAddBookmark={handleAddBookmark}
                handleRemoveBookmark={handleRemoveBookmark}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RecommendationList;
