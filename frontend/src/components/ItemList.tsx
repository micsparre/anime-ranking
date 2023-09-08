import React, { useState } from 'react';
import axios from 'axios';
import { Title } from '../api/ApiTypes';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SelectedListItem from './SelectedListItem';

interface ItemListProps {
  items: Title[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemList: React.FC<ItemListProps> = ({ items, loading, setLoading }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const onItemClick = (item: Title, index : number) => {
    const apiUrl = `https://anime-ranking.onrender.com/api/create_title`;
    const itemData = { media_id: item.id, title: item.title };
    setSelectedIndex(index);

    axios
      .post(apiUrl, itemData)
      .then((response) => {
        // Handle the response data as needed
        console.log('Item created:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching item created details:', error);
      });
  };

  return (
    loading ? (
      <CircularProgress />
    ) : (
      <Box sx={{ width: '100%', maxWidth: 360 }}>
        <List>
          {items.map((item: Title, index: number) => (
              <SelectedListItem
                selectedIndex={selectedIndex}
                handleListItemClick={onItemClick}
                key={item.id}
                itemIndex={index}
                item={item}
              />
            )
          )}
        </List>
      </Box>
    )
  );
};

export default ItemList;