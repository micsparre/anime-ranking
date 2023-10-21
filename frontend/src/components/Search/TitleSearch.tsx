import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ItemList from "./ItemList";
import { Anime } from "../Shared/Types";

const TitleSearch: React.FC = () => {
  const [data, setData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <SearchBar setData={setData} setLoading={setLoading} />
      <ItemList items={data} loading={loading} />
    </div>
  );
};

export default TitleSearch;
