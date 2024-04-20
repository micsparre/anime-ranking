import React, { useState } from "react";
import { RankingsObject, AnimeObject } from "../common/types";
import BookmarkItem from "./BookmarkItem";
import { removeBookmark } from "../common/api";
import RankingModal from "../ranking/RankingModal";

interface BookmarkListProps {
  rankings: RankingsObject[];
  bookmarks: AnimeObject[];
  appendRankingItem: (ranking: RankingsObject) => void;
  removeBookmarksItem: (bookmark: AnimeObject) => void;
}

const BookmarkList: React.FC<BookmarkListProps> = ({
  rankings,
  bookmarks,
  appendRankingItem,
  removeBookmarksItem,
}) => {
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [rankingItem, setRankingItem] = useState<RankingsObject>(
    {} as RankingsObject
  );

  const handleRemoveBookmark = async (item: AnimeObject) => {
    try {
      const itemId = item.id;
      const response = await removeBookmark(itemId);
      if (response) {
        removeBookmarksItem(item);
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
    return true;
  };

  const openRankingModal = (item: AnimeObject) => {
    try {
      setRankingItem({ ...item, ranking: 0 } as RankingsObject);
      setShowRankingModal(true);
    } catch (error) {
      console.error("Error:", error);
      return false;
    }

    return true;
  };

  const closeRankingModal = (isRanked: boolean) => {
    setShowRankingModal(false);
    if (!isRanked) {
      return true;
    }
    return true;
  };

  return (
    <>
      {showRankingModal && (
        <RankingModal
          item={rankingItem}
          rankings={rankings}
          appendRankingItem={appendRankingItem}
          onClose={closeRankingModal}
          updateShowRankingModal={setShowRankingModal}
          removeBookmarksItem={removeBookmarksItem}
        />
      )}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-6">
          {bookmarks.map((item: AnimeObject) => (
            <li
              key={item.id}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <BookmarkItem
                item={item}
                removeBookmark={handleRemoveBookmark}
                handleAddAnime={openRankingModal}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BookmarkList;
