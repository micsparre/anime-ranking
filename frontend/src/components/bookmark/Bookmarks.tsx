import React, { useState, useEffect } from "react";
import { RankingsObject, AnimeObject } from "../common/types";
import LoadingSpinner from "../common/LoadingSpinner";
import BookmarkList from "./BookmarkList";
import DisplayMessage from "../common/DisplayMessage";

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
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (bookmarks && bookmarks.length === 0) {
      setMessage("No bookmarks yet. Please add some!");
    } else {
      setMessage("");
    }
  }, [bookmarks, setMessage]);

  return (
    <>
      {(isUserLoading && <LoadingSpinner />) || (
        <>
          {message ? (
            <DisplayMessage isMiddle={true} message={message} />
          ) : (
            <div className="bg-gray-100 min-h-screen">
              <BookmarkList
                bookmarks={bookmarks}
                rankings={rankings}
                appendRankingItem={appendRankingItem}
                removeBookmarksItem={removeBookmarksItem}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Bookmarks;
