import React, { useState, useEffect } from "react";
import {
  getUserAnimeList,
  getUserBookmarks,
  addBookmark,
  removeBookmark,
} from "./api";
import { UserAnimeObject, AnimeObject } from "./types";
import { get as Levenshtein } from "fast-levenshtein";
import SearchItem from "./SearchItem";
import LoginPrompt from "../authentication/LoginPrompt";
import RankingModal from "./RankingModal";

interface SearchAnimeListProps {
  items: AnimeObject[];
  query: string;
  animeList: UserAnimeObject[];
  setAnimeList: (animeList: UserAnimeObject[]) => void;
  searched: boolean;
}

const SearchAnimeList: React.FC<SearchAnimeListProps> = ({
  items,
  query,
  animeList,
  setAnimeList,
  searched,
}) => {
  const [bookmarks, setBookmarks] = useState<AnimeObject[]>([]);
  const [sortedItems, setSortedItems] = useState<AnimeObject[]>([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
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

  const sortItems = (items: AnimeObject[]) => {
    return items
      .sort((a, b) => {
        if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
          return 1;
        }
        if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
          return -1;
        }
        return 0;
      })
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const aDistance = Levenshtein(aTitle, query);
        const bDistance = Levenshtein(bTitle, query);
        return (
          aDistance -
          bDistance +
          (aTitle.includes(query) ? -100 : bTitle.includes(query) ? 100 : 0)
        );
      })
      .sort((a, b) => {
        const aAdded = isAnimeAdded(a);
        const bAdded = isAnimeAdded(b);
        return aAdded === bAdded ? 0 : aAdded ? -1 : 1;
      });
  };

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
    const sorted = sortItems(items);
    setSortedItems(sorted);
    // eslint-disable-next-line
  }, [items]);

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
            {sortedItems.map((item: AnimeObject) => (
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
