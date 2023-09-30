import React, { useState } from "react";
import api from "../Shared/api";
import { Anime } from "../Shared/Types";

interface SearchBarProps {
  setData: React.Dispatch<React.SetStateAction<Anime[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setData, setLoading }) => {
  const [searchTitle, setSearchTitle] = useState(""); // State to hold the search title
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSearch = () => {
    setLoading(true);

    // Make a GET request to the Django API with the searchTitle parameter
    api
      .get(apiUrl + "/api/titles", {
        params: { title: searchTitle }, // Send the title parameter in the query
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label htmlFor="searchTitle">Search anime titles:</label>
      <input
        type="text"
        id="searchTitle"
        name="searchTitle"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        style={{ marginLeft: "8px", marginRight: "8px" }}
      />
      <button
        type="button"
        onClick={handleSearch}
        style={{
          backgroundColor: "blue",
          color: "white",
          border: "none",
          padding: "8px",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
