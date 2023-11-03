import React, { useState, useEffect } from "react";
import api from "./api";
import { UserAnimeObject, AnimeObject } from "./types";
import { get as Levenshtein } from "fast-levenshtein";
import LoadingSpinner from "./LoadingSpinner";
import DisplayMessage from "./DisplayMessage";
import SearchItem from "./SearchItem";
import LoginPrompt from "../authentication/LoginPrompt";
import { addBookmark, removeBookmark } from "./bookmark";
import RankingModal from "./RankingModal";

interface SearchAnimeListProps {
  items: AnimeObject[];
  loading: boolean;
  query: string;
}

const SearchAnimeList: React.FC<SearchAnimeListProps> = ({
  items,
  loading,
  query,
}) => {
  const [animeList, setAnimeList] = useState<UserAnimeObject[]>([]);
  const [bookmarks, setBookmarks] = useState<AnimeObject[]>([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [searched, setSearched] = useState(false);
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
    const apiUrl = process.env.REACT_APP_API_URL;
    api
      .get(apiUrl + "/api/anime-list")
      .then((response) => {
        setAnimeList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching anime list:", error);
      });
    api
      .get(apiUrl + "/api/bookmarks")
      .then((response) => {
        setBookmarks(response.data);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const sorted = sortItems(items);
    setSortedItems(sorted);
    // eslint-disable-next-line
  }, [items]);

  useEffect(() => {
    if (loading) {
      setSearched(true);
    } else if (items.length === 0 && searched) {
      setSearchMessage("No results found. Please try another search.");
    } else {
      setSearchMessage("");
    }
  }, [items, loading, searched]);

  const handleAddAnime = (item: AnimeObject) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { anime_id: item.id, title: item.title };
    const isLoggedIn = localStorage.getItem("token") !== null;
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setShowRankingModal(true);
    setRankingItem({ ...item, ranking: 0 } as UserAnimeObject);
    api
      .post(apiUrl + "/api/add-anime-to-list", itemData)
      .then((response) => {
        setAnimeList([...animeList, rankingItem]);
      })
      .catch((error) => {
        console.error("Error fetching item created details:", error);
      });
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

  return (
    <>
      {showLoginPrompt && (
        <LoginPrompt
          handleLoginClick={handleLoginClick}
          handleSignupClick={handleSignupClick}
        />
      )}
      {showRankingModal && (
        <RankingModal
          item={rankingItem}
          animeList={animeList}
          onClose={() => setShowRankingModal(false)}
        />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex justify-center pr-6 pl-6">
          <div className="w-full max-w-md">
            {searchMessage ? (
              <DisplayMessage message={searchMessage} />
            ) : (
              <ul className="divide-y divide-gray-200">
                {sortedItems.map((item: AnimeObject) => (
                  <li key={item.id} className="flex py-4">
                    <SearchItem
                      item={item}
                      isAdded={isAnimeAdded(item)}
                      isBookmarked={isBookmarkAdded(item)}
                      handleAddBookmark={handleAddBookmark}
                      handleRemoveBookmark={handleRemoveBookmark}
                      handleAddAnime={handleAddAnime}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchAnimeList;
