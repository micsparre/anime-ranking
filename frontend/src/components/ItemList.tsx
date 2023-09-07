import React from 'react';
import { Title } from '../api/ApiTypes';

const SearchBar: React.FC = (items : Title[], loading : boolean, onItemClick : ) => { 
  return (
    loading ? (
        <p>Loading...</p>
    ) :
    (
    <ul>
      {items.map((item : Title) => (
        <li key={item.id} onClick={() => onItemClick(item)}>
          {item.title}
        </li>
      ))}
    </ul>
  ));
}

export default ItemList;