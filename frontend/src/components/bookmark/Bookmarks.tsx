import React from "react";
import { RankingsObject, AnimeObject } from "../common/types";
import LoadingSpinner from "../common/LoadingSpinner";
import BookmarkList from "./BookmarkList";

interface BookmarksProps {
  rankings: RankingsObject[];
  bookmarks: AnimeObject[];
  appendRankingItem: (ranking: RankingsObject) => void;
  removeBookmarksItem: (bookmark: AnimeObject) => void;
  isUserLoading: boolean;
}

const Bookmarks: React.FC<BookmarksProps> = ({
  rankings,
  bookmarks,
  appendRankingItem,
  removeBookmarksItem,
  isUserLoading,
}) => {
  return (
    (isUserLoading && <LoadingSpinner />) || (
      <div className="bg-gray-100 min-h-screen">
        <BookmarkList
          bookmarks={bookmarks}
          rankings={rankings}
          appendRankingItem={appendRankingItem}
          removeBookmarksItem={removeBookmarksItem}
        />
      </div>
    )
  );
};

export default Bookmarks;
