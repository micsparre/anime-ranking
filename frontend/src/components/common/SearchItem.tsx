import React from "react";
import { AnimeObject } from "./types";
import getDescription from "./utils";
import { FaCheck, FaBookmark, FaRegBookmark } from "react-icons/fa";

interface SearchItemProps {
  item: AnimeObject;
  isAdded: boolean;
  isBookmarked: boolean;
  handleAddBookmark: (item: AnimeObject) => void;
  handleRemoveBookmark: (item: AnimeObject) => void;
  handleAddAnime: (item: AnimeObject) => void;
  handleRemoveAnime: (item: AnimeObject) => void;
}

const SearchItem: React.FC<SearchItemProps> = ({
  item,
  isAdded,
  isBookmarked,
  handleAddBookmark,
  handleRemoveBookmark,
  handleAddAnime,
  handleRemoveAnime,
}) => {
  return (
    <>
      <div className="ml-3 mr-10">
        <div className="text-lg font-medium text-gray-900">{item.title}</div>
        <div className="text-sm text-gray-500">{getDescription(item)}</div>
      </div>
      <div className="ml-auto flex mt-1 items-center justify-center">
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded flex items-center justify-center h-10 w-10"
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
    </>
  );
};

export default SearchItem;
