import React, { useState, useEffect, useCallback } from "react";
import { addBookmark, removeBookmark } from "./api";
import { UserAnimeObject, AnimeObject } from "./types";
import SearchItem from "./SearchItem";
import LoginPrompt from "../authentication/LoginPrompt";
import RankingModal from "./RankingModal";

export interface SearchListProps {
  animeList: UserAnimeObject[];
  updateAnimeList: (anime: UserAnimeObject) => void;
  bookmarks: AnimeObject[];
  updateBookmarks: (anime: AnimeObject) => void;
  updateBookmarkRemoval: (anime: AnimeObject) => void;
  searchItems: AnimeObject[];
  updateSearchMessage: (message: string) => void;
  token: string | null;
}

const SearchList: React.FC<SearchListProps> = ({
  animeList,
  updateAnimeList,
  bookmarks,
  updateBookmarks,
  updateBookmarkRemoval,
  searchItems,
  updateSearchMessage,
  token,
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
    console.log("searchItems:", searchItems);
    if (searchItems && searchItems.length === 0) {
      updateSearchMessage("No results found. Please try another search.");
    } else {
      updateSearchMessage("");
    }
  }, [searchItems, updateSearchMessage]);

  useEffect(() => {
    const ranked = searchItems.filter((item) => isAnimeAdded(item));
    setRankedItems(ranked);
    const bookmarked = searchItems.filter((item) => isBookmarkAdded(item));
    setBookmarkedItems(bookmarked);
  }, [searchItems, animeList, bookmarks, isAnimeAdded, isBookmarkAdded]);

  const openRankingModal = (item: AnimeObject): boolean => {
    const isLoggedIn = token !== null;
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return false;
    }
    setRankingItem({ ...item, ranking: 0 } as UserAnimeObject);
    setShowRankingModal(true);
    return true;
  };

  const closeRankingModal = () => {
    try {
      setShowRankingModal(false);
      updateAnimeList(rankingItem);
    } catch (error) {
      console.error(error);
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  };

  const handleAddBookmark = async (item: AnimeObject): Promise<boolean> => {
    const isLoggedIn = token !== null;
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return false;
    }
    const itemId = item.id;
    updateBookmarks(item);
    const response = await addBookmark(itemId);
    if (!response) {
      updateBookmarkRemoval(item);
    }
    return true;
  };

  const handleRemoveBookmark = async (item: AnimeObject): Promise<boolean> => {
    const itemId = item.id;
    const response = await removeBookmark(itemId);
    if (response) {
      updateBookmarkRemoval(item);
      return true;
    }
    return false;
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

export default SearchList;
