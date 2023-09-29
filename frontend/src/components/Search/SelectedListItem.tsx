import * as React from "react";
import { Anime } from "../Shared/Types";

interface SelectedListItemProps {
  selectedIndex: number;
  handleListItemClick: (item: Anime, index: number) => void;
  itemIndex: number;
  item: Anime;
}
const SelectedListItem: React.FC<SelectedListItemProps> = ({
  selectedIndex,
  handleListItemClick,
  itemIndex,
  item,
}) => {
  return (
    <div>
      <button
        className={selectedIndex === itemIndex ? "selected" : ""}
        onClick={() => handleListItemClick(item, itemIndex)}
      >
        {item.title}
      </button>
      <hr />
    </div>
  );
};

export default SelectedListItem;
