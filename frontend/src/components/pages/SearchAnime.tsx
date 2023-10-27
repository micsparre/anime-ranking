import React, { useState } from "react";
import SearchBar from "../common/SearchBar";
import SearchList from "../common/SearchList";
import { AnimeObject } from "../common/types";

const SearchAnime: React.FC = () => {
  const [data, setData] = useState<AnimeObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      <SearchBar
        setData={setData}
        setLoading={setLoading}
        query={query}
        setQuery={setQuery}
      />
      <SearchList items={data} loading={loading} query={query} />
    </div>
  );
};

export default SearchAnime;
