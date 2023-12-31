import React, { useState } from "react";
import { getSearchTitles } from "./api";
import { AnimeObject } from "./types";

interface SearchBarProps {
  setData: React.Dispatch<React.SetStateAction<AnimeObject[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setData,
  setLoading,
  query,
  setQuery,
}) => {
  const [isStale, setIsStale] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLowerCase());
    setIsStale(true);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isStale) {
      return;
    }
    setLoading(true);
    getSearchTitles(query).then((response) => {
      setData(response);
      setLoading(false);
    });
    setIsStale(false);
  };

  return (
    <div className="mt-16 flex justify-center pt-8 p-6">
      <div className="w-full max-w-md">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by title"
            id="searchTitle"
            name="searchTitle"
            value={query}
            onChange={(e) => handleOnChange(e)}
            className="placeholder:italic placeholder:text-slate-400 block w-full px-4 py-2 rounded-md border border-gray-300"
          />
          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
