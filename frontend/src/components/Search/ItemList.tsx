import React, { useState } from "react";
import axios from "axios";
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
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { media_id: item.id, title: item.title };
    setSelectedIndex(index);

    axios
      .post(apiUrl + "create_title", itemData)
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
          <li
            className={selectedIndex === index ? "selected" : ""}
            onClick={() => onItemClick(item, index)}
            key={item.id}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
