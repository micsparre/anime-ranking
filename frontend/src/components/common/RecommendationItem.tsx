import React from "react";
import { getDescription } from "./utils";
import { AnimeObject } from "./types";
import { AddButton, BookmarkButton, CheckButton } from "./Buttons";

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
      <div className="ml-auto flex mt-1 items-center justify-center">
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
    </div>
  );
};

export default RecommendationItem;
