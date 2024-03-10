import React, { useState, useEffect, useCallback, memo } from "react";
import { addBookmark, removeBookmark } from "./api";
import { UserAnimeObject, AnimeObject } from "./types";
import SearchItem from "./SearchItem";
import LoginPrompt from "../authentication/LoginPrompt";
import RankingModal from "./RankingModal";

interface SearchListProps {
  animeList: UserAnimeObject[];
  updateAnimeList: (anime: UserAnimeObject) => void;
  bookmarks: AnimeObject[];
  updateBookmarks: (anime: AnimeObject) => void;
  updateBookmarkRemoval: (anime: AnimeObject) => void;
  searchItems: AnimeObject[];
  hasSearched: boolean;
  updateSearchMessage: (message: string) => void;
}

const SearchList: React.FC<SearchListProps> = ({
  animeList,
  updateAnimeList,
  bookmarks,
  updateBookmarks,
  updateBookmarkRemoval,
  searchItems,
  hasSearched,
  updateSearchMessage,
}) => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [rankingItem, setRankingItem] = useState<UserAnimeObject>(
    {} as UserAnimeObject
  );
  const [rankedItems, setRankedItems] = useState<AnimeObject[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<AnimeObject[]>([]);

  const isAnimeAdded = useCallback(
    (anime: AnimeObject) => {
      return animeList.some((item) => item.id === anime.id);
    },
    [animeList]
  );

  const isBookmarkAdded = useCallback(
    (anime: AnimeObject) => {
      return bookmarks.some((item) => item.id === anime.id);
    },
    [bookmarks]
  );

  useEffect(() => {
    if (searchItems.length === 0 && hasSearched) {
      updateSearchMessage("No results found. Please try another search.");
    } else {
      updateSearchMessage("");
    }
  }, [searchItems, hasSearched, updateSearchMessage]);

  useEffect(() => {
    const ranked = searchItems.filter((item) => isAnimeAdded(item));
    setRankedItems(ranked);
    const bookmarked = searchItems.filter((item) => isBookmarkAdded(item));
    setBookmarkedItems(bookmarked);
  }, [searchItems, animeList, bookmarks, isAnimeAdded, isBookmarkAdded]);

  const openRankingModal = (item: AnimeObject) => {
    const isLoggedIn = localStorage.getItem("token") !== null;
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setRankingItem({ ...item, ranking: 0 } as UserAnimeObject);
    setShowRankingModal(true);
  };

  const closeRankingModal = async () => {
    setShowRankingModal(false);
    updateAnimeList(rankingItem);
  };

  const handleAddBookmark = async (item: AnimeObject) => {
    const isLoggedIn = localStorage.getItem("token") !== null;
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    const itemId = item.id;
    const response = await addBookmark(itemId);
    if (response) {
      updateBookmarks(item);
    }
    return true;
  };

  const handleRemoveBookmark = async (item: AnimeObject) => {
    const itemId = item.id;
    const response = await removeBookmark(itemId);
    if (response) {
      updateBookmarkRemoval(item);
    }
  };

  const handleLoginClick = () => {
    setShowLoginPrompt(false);
    window.location.href = "/login";
  };

  const handleSignupClick = () => {
    setShowLoginPrompt(false);
    window.location.href = "/register";
  };

  const closeLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  return (
    <>
      {showLoginPrompt && (
        <LoginPrompt
          handleLoginClick={handleLoginClick}
          handleSignupClick={handleSignupClick}
          closeLoginPrompt={closeLoginPrompt}
        />
      )}
      {showRankingModal && (
        <RankingModal
          item={rankingItem}
          animeList={animeList}
          onClose={closeRankingModal}
        />
      )}
      <div className="flex justify-center pr-6 pl-6">
        <div className="w-full max-w-md">
          <ul className="divide-y divide-gray-200">
            {rankedItems.map((item: AnimeObject) => (
              <li key={item.id} className="flex py-4">
                <SearchItem
                  item={item}
                  isAdded={isAnimeAdded(item)}
                  isBookmarked={isBookmarkAdded(item)}
                  handleAddBookmark={handleAddBookmark}
                  handleRemoveBookmark={handleRemoveBookmark}
                  handleAddAnime={openRankingModal}
                />
              </li>
            ))}
            {bookmarkedItems.map((item: AnimeObject) => (
              <li key={item.id} className="flex py-4">
                <SearchItem
                  item={item}
                  isAdded={isAnimeAdded(item)}
                  isBookmarked={isBookmarkAdded(item)}
                  handleAddBookmark={handleAddBookmark}
                  handleRemoveBookmark={handleRemoveBookmark}
                  handleAddAnime={openRankingModal}
                />
              </li>
            ))}
            {searchItems
              .filter((item) => !isAnimeAdded(item) && !isBookmarkAdded(item))
              .map((item: AnimeObject) => (
                <li key={item.id} className="flex py-4">
                  <SearchItem
                    item={item}
                    isAdded={isAnimeAdded(item)}
                    isBookmarked={isBookmarkAdded(item)}
                    handleAddBookmark={handleAddBookmark}
                    handleRemoveBookmark={handleRemoveBookmark}
                    handleAddAnime={openRankingModal}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default memo(SearchList);
