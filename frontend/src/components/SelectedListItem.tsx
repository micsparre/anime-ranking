import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Title } from '../api/ApiTypes';
import Divider from '@mui/material/Divider';

interface SelectedListItemProps {
    selectedIndex: number;
    handleListItemClick: (item: Title, index: number) => void;
    itemIndex: number;
    item: Title;
}

const SelectedListItem: React.FC<SelectedListItemProps> = ({selectedIndex, handleListItemClick, itemIndex, item}) => {
  return (
        <div>
        <ListItemButton
          selected={selectedIndex === itemIndex}
          onClick={() => handleListItemClick(item, itemIndex)}
        >
            <ListItemText primary={item.title} />
        </ListItemButton>
        <Divider component="li" />
        </div>
        
  );
};

export default SelectedListItem;