import React, { useState } from "react";
import { getDescription } from "../common/utils";
import { AnimeObject } from "../common/types";
import { AddButton, BookmarkButton, CheckButton } from "../common/Buttons";

interface RecommendationItemProps {
  item: AnimeObject;
  isRanked: boolean;
  isBookmarked: boolean;
  handleAddAnime: (item: AnimeObject) => boolean;
  handleAddBookmark: (item: AnimeObject) => Promise<boolean>;
  handleRemoveBookmark: (item: AnimeObject) => Promise<boolean>;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({
  item,
  isRanked,
  isBookmarked,
  handleAddAnime,
  handleAddBookmark,
  handleRemoveBookmark,
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
    <div className="w-full flex items-center justify-between p-6 space-x-6">
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-3">
          <h3 className="text-gray-900 text-sm  truncate">{item.title}</h3>
        </div>
        <p className="mt-1 text-gray-500 text-sm truncate">
          {getDescription(item)}
        </p>
      </div>
      <div className="ml-auto flex mt-1 items-center justify-center">
        {isRanked ? (
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
    </div>
  );
};

export default RecommendationItem;
