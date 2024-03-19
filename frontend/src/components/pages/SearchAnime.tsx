import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../common/SearchBar";
import SearchList from "../common/SearchList";
import { AnimeObject, UserAnimeObject } from "../common/types";
import { getUserAnimeList, getUserBookmarks } from "../common/api";
import LoadingSpinner from "../common/LoadingSpinner";
import DisplayMessage from "../common/DisplayMessage";

interface SearchAnimeProps {
  token: string | null;
}

const SearchAnime: React.FC<SearchAnimeProps> = ({ token }) => {
  const [data, setData] = useState<AnimeObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [animeList, setAnimeList] = useState<UserAnimeObject[]>([]);
  const [bookmarks, setBookmarks] = useState<AnimeObject[]>([]);

  useEffect(() => {
    getUserAnimeList().then((response) => {
      setAnimeList(response);
    });

    getUserBookmarks().then((response) => {
      setBookmarks(response);
    });
  }, []);

  useEffect(() => {
    if (loading) {
      setHasSearched(true);
    }
  }, [loading]);

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
        setData={setData}
        setLoading={setLoading}
        query={query}
        setQuery={setQuery}
      />
      <>
        {(loading && <LoadingSpinner />) || (
          <>
            {searchMessage ? (
              <DisplayMessage message={searchMessage} />
            ) : (
              <SearchList
                animeList={animeList}
                updateAnimeList={updateAnimeList}
                updateBookmarks={updateBookmarks}
                updateBookmarkRemoval={updateBookmarkRemoval}
                bookmarks={bookmarks}
                searchItems={data}
                hasSearched={hasSearched}
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
