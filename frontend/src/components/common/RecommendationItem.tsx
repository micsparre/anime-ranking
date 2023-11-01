import React from "react";
import getDescription from "./utils";
import { FaCheck, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { AnimeObject } from "./types";

interface RecommendationItemProps {
  item: AnimeObject;
  isAdded: boolean;
  isBookmarked: boolean;
  handleAddAnime: (item: AnimeObject) => void;
  handleRemoveAnime: (item: AnimeObject) => void;
  handleAddBookmark: (item: AnimeObject) => void;
  handleRemoveBookmark: (item: AnimeObject) => void;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({
  item,
  isAdded,
  isBookmarked,
  handleRemoveAnime,
  handleAddAnime,
  handleAddBookmark,
  handleRemoveBookmark,
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
      <div className="ml-auto flex mt-1">
        {isAdded ? (
          <button
            onClick={() => handleRemoveAnime(item)}
            className="bg-green-500 hover:bg-red-700 text-white font-bold px-4 rounded flex items-center justify-center h-10 w-10"
          >
            <FaCheck />
          </button>
        ) : (
          <div>
            <button
              onClick={() => handleAddAnime(item)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center h-10 w-10"
            >
              +
            </button>

            {isBookmarked ? (
              <button
                onClick={() => handleRemoveBookmark(item)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded flex items-center justify-center h-10 w-10"
              >
                <FaBookmark />
              </button>
            ) : (
              <button
                onClick={() => handleAddBookmark(item)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded flex items-center justify-center h-10 w-10"
              >
                <FaRegBookmark />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationItem;
