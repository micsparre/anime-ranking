import React, { useState } from "react";
import api from "./api";
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
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsStale(true);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isStale) {
      return;
    }
    setLoading(true);
    api
      .get(apiUrl + "/api/titles", {
        params: { title: query },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching titles:", error);
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
            className="placeholder:italic placeholder:text-slate-400 block w-full px-4 py-2 rounded-md bg-white-100 border-transparent focus:border-white-900 focus:bg-white focus:ring-0"
          />
          <button
            type="submit"
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
