import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ItemList from './ItemList';
import Container from '@mui/material/Container';
import {Anime} from '../Shared/Types';

const TitleSearch: React.FC = () => {
  const [data, setData] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <SearchBar setData={setData} setLoading={setLoading} />
      <ItemList items={data} loading={loading} setLoading={setLoading} />
    </Container>
  );
}

export default TitleSearch;
