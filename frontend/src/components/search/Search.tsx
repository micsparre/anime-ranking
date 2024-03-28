import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../search/SearchBar";
import MemoizedSearchList from "../search/MemoizedSearchList";
import { AnimeObject, RankingsObject } from "../common/types";
import LoadingSpinner from "../common/LoadingSpinner";
import DisplayMessage from "../common/DisplayMessage";

interface SearchProps {
  token: string | null;
  rankings: RankingsObject[];
  bookmarks: AnimeObject[];
  appendRankingItem: (ranking: RankingsObject) => void;
  appendBookmarksItem: (bookmark: AnimeObject) => void;
  removeBookmarksItem: (bookmark: AnimeObject) => void;
}

const Search: React.FC<SearchProps> = ({
  token,
  rankings,
  bookmarks,
  appendRankingItem,
  appendBookmarksItem,
  removeBookmarksItem,
}) => {
  const [searchResults, setSearchResults] = useState<AnimeObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    setSearchMessage("");
  }, [searchResults]);

  const updateSearchMessage = useCallback((message: string) => {
    setSearchMessage(message);
  }, []);

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <SearchBar
        handleSearchResultsChange={setSearchResults}
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
                rankings={rankings}
                bookmarks={bookmarks}
                appendRankingItem={appendRankingItem}
                appendBookmarksItem={appendBookmarksItem}
                removeBookmarksItem={removeBookmarksItem}
                searchResults={searchResults}
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

export default Search;
