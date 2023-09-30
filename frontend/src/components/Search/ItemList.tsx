import React, { useState } from "react";
import api from "../Shared/api";
import { Anime } from "../Shared/Types";
import SelectedListItem from "./SelectedListItem";

interface ItemListProps {
  items: Anime[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemList: React.FC<ItemListProps> = ({ items, loading, setLoading }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const onItemClick = (item: Anime, index: number) => {
    console.log("Item clicked:", item);
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { anime_id: item.id, title: item.title };
    setSelectedIndex(index);

    api
      .post(apiUrl + "/api/add-anime-to-list", itemData)
      .then((response) => {
        // Handle the response data as needed
        console.log("Item created:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching item created details:", error);
      });
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div style={{ width: "100%", maxWidth: 360 }}>
      <ul>
        {items.map((item: Anime, index: number) => (
          <SelectedListItem
            selectedIndex={selectedIndex}
            handleListItemClick={onItemClick}
            key={item.id}
            itemIndex={index}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
