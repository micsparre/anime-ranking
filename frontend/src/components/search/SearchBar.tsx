import React, { useState } from "react";
import { getSearchTitles } from "../common/api";
import { AnimeObject } from "../common/types";

interface SearchBarProps {
  handleSearchResultsChange: React.Dispatch<
    React.SetStateAction<AnimeObject[]>
  >;
  updateLoading: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  updateQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearchResultsChange,
  updateLoading,
  query,
  updateQuery,
}) => {
  const [isStale, setIsStale] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(event.target.value.toLowerCase());
    setIsStale(true);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isStale) {
      return;
    }
    updateLoading(true);
    getSearchTitles(query)
      .then((response) => {
        handleSearchResultsChange(response);
        updateLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    setIsStale(false);
  };

  return (
    <div className="mt-16 flex justify-center pt-8 p-6">
      <div className="w-full max-w-md">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search anime titles"
            id="searchTitle"
            name="searchTitle"
            value={query}
            onChange={(e) => handleOnChange(e)}
            className="placeholder:italic placeholder:text-slate-400 block w-full px-4 py-2 rounded-md border border-gray-300"
          />
          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#77625C] hover:bg-[#49392C]"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
