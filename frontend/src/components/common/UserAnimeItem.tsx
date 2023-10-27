import React from "react";
import { UserAnimeObject } from "../common/types";
import getDescription from "../common/utils";
import { FaTimes } from "react-icons/fa";

interface UserAnimeItemProps {
  item: UserAnimeObject;
  handleRemoveAnime: (item: UserAnimeObject) => void;
}

const UserAnimeItem: React.FC<UserAnimeItemProps> = ({
  item,
  handleRemoveAnime,
}) => {
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
        <button
          className="mt-3 bg-gray-300 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center justify-center h-6 w-6"
          onClick={() => handleRemoveAnime(item)}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default UserAnimeItem;
