import React from "react";
import { getDescription } from "./utils";
import { AddButton, BookmarkButton } from "./Buttons";
import { AnimeObject } from "./types";
interface BookmarkItemProps {
  item: AnimeObject;
  handleAddAnime: (item: AnimeObject) => boolean;
  removeBookmark: (item: AnimeObject) => Promise<boolean>;
}

const BookmarkItem: React.FC<BookmarkItemProps> = ({
  item,
  handleAddAnime,
  removeBookmark,
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
        <div className="ml-auto flex mt-1 items-center justify-center">
          <AddButton handleClick={handleAddAnime} item={item} />
          <BookmarkButton
            handleClick={removeBookmark}
            item={item}
            isBookmarked={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BookmarkItem;
