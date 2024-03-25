import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../common/SearchBar";
import MemoizedSearchList from "../common/MemoizedSearchList";
import { AnimeObject, UserAnimeObject } from "../common/types";
import { getUserAnimeList, getUserBookmarks } from "../common/api";
import LoadingSpinner from "../common/LoadingSpinner";
import DisplayMessage from "../common/DisplayMessage";

interface SearchAnimeProps {
  token: string | null;
}

const SearchAnime: React.FC<SearchAnimeProps> = ({ token }) => {
  const [items, setItems] = useState<AnimeObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [animeList, setAnimeList] = useState<UserAnimeObject[]>([]);
  const [bookmarks, setBookmarks] = useState<AnimeObject[]>([]);

  useEffect(() => {
    getUserAnimeList()
      .then((response) => {
        setAnimeList(response);
      })
      .catch((error) => {
        console.error(error);
      });
    getUserBookmarks()
      .then((response) => {
        setBookmarks(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setSearchMessage("");
  }, [items]);

  const updateSearchMessage = useCallback((message: string) => {
    setSearchMessage(message);
  }, []);

  const updateAnimeList = useCallback((anime: UserAnimeObject) => {
    setAnimeList((a) => a.concat(anime));
  }, []);

  const updateBookmarks = useCallback((anime: AnimeObject) => {
    setBookmarks((b) => b.concat(anime));
  }, []);

  const updateBookmarkRemoval = useCallback((anime: AnimeObject) => {
    setBookmarks((b) => b.filter((item) => item.id !== anime.id));
  }, []);

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <SearchBar
        updateItems={setItems}
        updateLoading={setLoading}
        query={query}
        updateQuery={setQuery}
      />
      <>
        {(loading && <LoadingSpinner />) || (
          <>
            {searchMessage ? (
              <DisplayMessage message={searchMessage} />
            ) : (
              <MemoizedSearchList
                animeList={animeList}
                updateAnimeList={updateAnimeList}
                updateBookmarks={updateBookmarks}
                updateBookmarkRemoval={updateBookmarkRemoval}
                bookmarks={bookmarks}
                searchItems={items}
                updateSearchMessage={updateSearchMessage}
                token={token}
              />
            )}
          </>
        )}
      </>
    </div>
  );
};

export default SearchAnime;
