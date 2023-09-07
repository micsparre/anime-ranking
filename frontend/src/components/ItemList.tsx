import React from 'react';
import axios from 'axios';
import { Title } from '../api/ApiTypes';

interface ItemListProps {
  items: Title[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemList: React.FC<ItemListProps> = ({items, loading, setLoading}) => {
  
  const onItemClick = (item : Title) => {
    // Construct the URL for your Django API
    const apiUrl = `https://your-django-api-url/${item.id}`; // Modify the URL as needed

    setLoading(true);

    // Make a GET request to fetch details of the clicked item
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the response data as needed
        console.log('Item details:', response.data);

        // You can update your UI or state with the item details if necessary
        // For example, you can set the details in a state variable and render them in your component
      })
      .catch((error) => {
        console.error('Error fetching item details:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
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