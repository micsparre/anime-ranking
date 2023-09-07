import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ItemList from '../components/ItemList';
import { Title } from '../api/ApiTypes';

const TitleSearch: React.FC = () => {
  const [data, setData] = useState<Title[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <SearchBar setData={setData} setLoading={setLoading} />
      <ItemList items={data} loading={loading} setLoading={setLoading} />
    </div>
  );
}

export default TitleSearch;
