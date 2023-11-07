import React from "react";
import { AnimeObject } from "./types";
import { getDescription } from "./utils";
import { AddButton, BookmarkButton, CheckButton } from "./Buttons";

interface SearchItemProps {
  item: AnimeObject;
  isAdded: boolean;
  isBookmarked: boolean;
  handleAddBookmark: (item: AnimeObject) => void;
  handleRemoveBookmark: (item: AnimeObject) => void;
  handleAddAnime: (item: AnimeObject) => void;
}

const SearchItem: React.FC<SearchItemProps> = ({
  item,
  isAdded,
  isBookmarked,
  handleAddBookmark,
  handleRemoveBookmark,
  handleAddAnime,
}) => {
  return (
    <>
      <div className="ml-3 mr-10">
        <div className="text-lg font-medium text-gray-900">{item.title}</div>
        <div className="text-sm text-gray-500">{getDescription(item)}</div>
      </div>
      <div className="ml-auto flex mt-1 mr-2 items-center justify-center">
        {isAdded ? (
          <CheckButton />
        ) : (
          <div className="ml-auto flex mt-1 items-center justify-center">
            <AddButton handleClick={handleAddAnime} item={item} />
            <BookmarkButton
              handleClick={
                isBookmarked ? handleRemoveBookmark : handleAddBookmark
              }
              item={item}
              isBookmarked={isBookmarked}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchItem;
