import React, { useState, useEffect, useCallback } from "react";
import {
  getUserAnimeList,
  getUserBookmarks,
  addBookmark,
  removeBookmark,
} from "./api";
import { UserAnimeObject, AnimeObject } from "./types";
import SearchItem from "./SearchItem";
import LoginPrompt from "../authentication/LoginPrompt";
import RankingModal from "./RankingModal";

interface SearchAnimeListProps {
  items: AnimeObject[];
  animeList: UserAnimeObject[];
  setAnimeList: (animeList: UserAnimeObject[]) => void;
  bookmarks: AnimeObject[];
  setBookmarks: (bookmarks: AnimeObject[]) => void;
  searched: boolean;
}

const SearchAnimeList: React.FC<SearchAnimeListProps> = ({
  items,
  animeList,
  setAnimeList,
  bookmarks,
  setBookmarks,
  searched,
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
    const isLoggedIn = localStorage.getItem("token") !== null;
    if (searched || !isLoggedIn) {
      return;
    }
    getUserAnimeList().then((response) => {
      setAnimeList(response);
    });

    getUserBookmarks().then((response) => {
      setBookmarks(response);
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // add to rankedItems from items if they are in animeList
    const ranked = items.filter((item) => isAnimeAdded(item));
    setRankedItems(ranked);
    // add to bookmarkedItems from items if they are in bookmarks
    const bookmarked = items.filter((item) => isBookmarkAdded(item));
    setBookmarkedItems(bookmarked);
  }, [items, animeList, bookmarks, isAnimeAdded, isBookmarkAdded]);

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
    setAnimeList([...animeList, rankingItem]);
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
      setBookmarks([...bookmarks, item]);
    }
    return true;
  };

  const handleRemoveBookmark = async (item: AnimeObject) => {
    const itemId = item.id;
    const response = await removeBookmark(itemId);
    if (response) {
      setBookmarks(bookmarks.filter((anime) => anime.id !== item.id));
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
            {items
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

export default SearchAnimeList;
