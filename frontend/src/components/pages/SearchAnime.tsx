import React, { useState, useEffect } from "react";
import SearchBar from "../common/SearchBar";
import SearchList from "../common/SearchList";
import { AnimeObject, UserAnimeObject } from "../common/types";
import LoadingSpinner from "../common/LoadingSpinner";
import DisplayMessage from "../common/DisplayMessage";

const SearchAnime: React.FC = () => {
  const [data, setData] = useState<AnimeObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [animeList, setAnimeList] = useState<UserAnimeObject[]>([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (data.length === 0 && searched) {
      setSearchMessage("No results found. Please try another search.");
    } else {
      setSearchMessage("");
    }
  }, [data, searched]);

  useEffect(() => {
    if (loading) {
      setSearched(true);
    }
  }, [loading]);

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
                items={data}
                query={query}
                animeList={animeList}
                setAnimeList={setAnimeList}
                searched={searched}
              />
            )}
          </>
        )}
      </>
    </div>
  );
};

export default SearchAnime;
