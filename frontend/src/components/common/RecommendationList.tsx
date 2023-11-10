import React, { useState } from "react";
import { UserAnimeObject, AnimeObject } from "./types";
import RecommendationItem from "./RecommendationItem";
import { addBookmark, removeBookmark } from "./api";
import RankingModal from "./RankingModal";

interface RecommendationListProps {
  recommendations: AnimeObject[];
  animeList: UserAnimeObject[];
  bookmarks: AnimeObject[];
  setAnimeList: React.Dispatch<React.SetStateAction<UserAnimeObject[]>>;
  setBookmarks: React.Dispatch<React.SetStateAction<AnimeObject[]>>;
}

const RecommendationList: React.FC<RecommendationListProps> = ({
  recommendations,
  animeList,
  bookmarks,
  setAnimeList,
  setBookmarks,
}) => {
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [rankingItem, setRankingItem] = useState<UserAnimeObject>(
    {} as UserAnimeObject
  );
  const isAnimeAdded = (anime: AnimeObject) => {
    return animeList.some((item) => item.id === anime.id);
  };

  const isBookmarkAdded = (anime: AnimeObject) => {
    return bookmarks.some((item) => item.id === anime.id);
  };

  const handleRemoveBookmark = async (item: AnimeObject) => {
    const itemId = item.id;
    const response = await removeBookmark(itemId);
    if (response) {
      setBookmarks(bookmarks.filter((anime) => anime.id !== item.id));
    }
  };

  const handleAddBookmark = async (item: AnimeObject) => {
    const itemId = item.id;
    const response = await addBookmark(itemId);
    if (response) {
      setBookmarks([...bookmarks, item]);
    }
  };

  const openRankingModal = (item: AnimeObject) => {
    setRankingItem({ ...item, ranking: 0 } as UserAnimeObject);
    setShowRankingModal(true);
  };

  const closeRankingModal = async () => {
    // TODO get ranking from rankingmodal object?
    const isBookmarked = isBookmarkAdded(rankingItem);
    if (isBookmarked) {
      handleRemoveBookmark(rankingItem);
    }
    setShowRankingModal(false);
    setAnimeList([...animeList, rankingItem]);
  };

  return (
    <>
      {showRankingModal && (
        <RankingModal
          item={rankingItem}
          animeList={animeList}
          onClose={closeRankingModal}
        />
      )}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-6">
          {recommendations.map((item: AnimeObject) => (
            <li
              key={item.id}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <RecommendationItem
                item={item}
                isAdded={isAnimeAdded(item)}
                isBookmarked={isBookmarkAdded(item)}
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
