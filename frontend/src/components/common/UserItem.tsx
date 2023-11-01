import React from "react";
import { UserAnimeObject } from "./types";
import getDescription from "./utils";
import { RemoveButton } from "./Buttons";

interface UserItemProps {
  item: UserAnimeObject;
  handleRemoveAnime: (item: UserAnimeObject) => void;
}

const UserItem: React.FC<UserItemProps> = ({ item, handleRemoveAnime }) => {
  return (
    <div className="w-full flex items-center justify-between p-6 space-x-6">
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-3">
          <h3 className="text-gray-900 text-sm font-medium truncate">
            {item.title}
          </h3>
        </div>
        <p className="mt-1 text-gray-500 text-sm truncate">
          {getDescription(item)}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <span className="flex-shrink-0 px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
          {item.ranking}
        </span>
        <RemoveButton handleClick={handleRemoveAnime} item={item} />
      </div>
    </div>
  );
};

export default UserItem;
