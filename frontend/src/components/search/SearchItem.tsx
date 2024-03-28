import React, { useState } from "react";
import { AnimeObject } from "../common/types";
import { getDescription } from "../common/utils";
import { AddButton, BookmarkButton, CheckButton } from "../common/Buttons";

interface SearchItemProps {
  item: AnimeObject;
  isAdded: boolean;
  isBookmarked: boolean;
  handleAddBookmark: (item: AnimeObject) => Promise<boolean>;
  handleRemoveBookmark: (item: AnimeObject) => Promise<boolean>;
  handleAddAnime: (item: AnimeObject) => boolean;
}

const SearchItem: React.FC<SearchItemProps> = ({
  item,
  isAdded,
  isBookmarked,
  handleAddBookmark,
  handleRemoveBookmark,
  handleAddAnime,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleBookmark = async (item: AnimeObject) => {
    setIsUpdating(true);
    try {
      if (isBookmarked) {
        await handleRemoveBookmark(item);
      } else {
        await handleAddBookmark(item);
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
    setIsUpdating(false);
    return true;
  };
  return (
    <>
      <div className="ml-3 mr-10">
        <div className="text-lg  text-gray-900">{item.title}</div>
        <div className="text-sm text-gray-500">{getDescription(item)}</div>
      </div>
      <div className="ml-auto flex mt-1 mr-2 items-center justify-center">
        {isAdded ? (
          <CheckButton />
        ) : (
          <div className="ml-auto flex mt-1 items-center justify-center">
            <AddButton handleClick={handleAddAnime} item={item} />
            <BookmarkButton
              handleClick={toggleBookmark}
              item={item}
              isBookmarked={isBookmarked}
              isUpdating={isUpdating}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchItem;
