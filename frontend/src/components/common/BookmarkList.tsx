import React, { useState } from "react";
import { UserAnimeObject, AnimeObject } from "./types";
import BookmarkItem from "./BookmarkItem";
import { removeBookmark } from "./api";
import RankingModal from "./RankingModal";

interface BookmarkListProps {
  bookmarks: AnimeObject[];
  animeList: UserAnimeObject[];
  setBookmarks: React.Dispatch<React.SetStateAction<AnimeObject[]>>;
  setAnimeList: React.Dispatch<React.SetStateAction<UserAnimeObject[]>>;
}

const BookmarkList: React.FC<BookmarkListProps> = ({
  bookmarks,
  animeList,
  setBookmarks,
  setAnimeList,
}) => {
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [rankingItem, setRankingItem] = useState<UserAnimeObject>(
    {} as UserAnimeObject
  );

  const handleRemoveBookmark = async (item: AnimeObject) => {
    try {
      const itemId = item.id;
      const response = await removeBookmark(itemId);
      if (response) {
        setBookmarks(bookmarks.filter((anime) => anime.id !== item.id));
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
    return true;
  };

  const openRankingModal = (item: AnimeObject) => {
    try {
      setRankingItem({ ...item, ranking: 0 } as UserAnimeObject);
      setShowRankingModal(true);
    } catch (error) {
      console.error("Error:", error);
      return false;
    }

    return true;
  };

  const closeRankingModal = async () => {
    // TODO get ranking from rankingmodal object?
    setShowRankingModal(false);
    await handleRemoveBookmark(rankingItem)
      .then(() => {
        setBookmarks(bookmarks.filter((anime) => anime.id !== rankingItem.id));
        setAnimeList([...animeList, rankingItem]);
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
    return true;
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
