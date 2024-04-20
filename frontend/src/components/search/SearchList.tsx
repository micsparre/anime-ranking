import React, { useState, useEffect, useCallback, useRef } from "react";
import { addBookmark, removeBookmark } from "../common/api";
import { RankingsObject, AnimeObject } from "../common/types";
import SearchItem from "./SearchItem";
import LoginModal from "../authentication/LoginModal";
import RankingModal from "../ranking/RankingModal";
import { useNavigate } from "react-router-dom";

export interface SearchListProps {
  token: string | null;
  rankings: RankingsObject[];
  bookmarks: AnimeObject[];
  appendRankingItem: (ranking: RankingsObject) => void;
  appendBookmarksItem: (bookmark: AnimeObject) => void;
  removeBookmarksItem: (bookmark: AnimeObject) => void;
  searchResults: AnimeObject[] | null;
  updateSearchMessage: (message: string) => void;
}

const SearchList: React.FC<SearchListProps> = ({
  token,
  rankings,
  bookmarks,
  appendRankingItem,
  appendBookmarksItem,
  removeBookmarksItem,
  searchResults,
  updateSearchMessage,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRankingModal, setShowRankingModal] = useState(false);
  const [rankingItem, setRankingItem] = useState<RankingsObject>(
    {} as RankingsObject
  );
  const [rankedSearchItems, setRankedSearchItems] = useState<AnimeObject[]>([]);
  const [bookmarkedSearchItems, setBookmarkedSearchItems] = useState<
    AnimeObject[]
  >([]);
  const [unattachedSearchItems, setUnattachedSearchItems] = useState<
    AnimeObject[]
  >([]);

  const isItemRanked = useCallback(
    (item: AnimeObject) => {
      return rankings.some((ranking) => ranking.id === item.id);
    },
    [rankings]
  );

  const isItemBookmarked = useCallback(
    (item: AnimeObject) => {
      return bookmarks.some((bookmark) => bookmark.id === item.id);
    },
    [bookmarks]
  );

  useEffect(() => {
    if (searchResults && searchResults.length === 0) {
      updateSearchMessage("No results found. Please try another search.");
    } else {
      updateSearchMessage("");
    }
  }, [searchResults, updateSearchMessage]);

  const openRankingModal = (item: AnimeObject): boolean => {
    const isLoggedIn = token !== null;
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }
    setRankingItem({ ...item, ranking: 0 } as RankingsObject);
    setShowRankingModal(true);
    return true;
  };

  const closeRankingModal = (isRanked: boolean) => {
    setShowRankingModal(false);
    if (!isRanked) {
      return false;
    }
    return true;
  };

  const handleAddBookmark = async (item: AnimeObject): Promise<boolean> => {
    const isLoggedIn = token !== null;
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }
    const itemId = item.id;
    appendBookmarksItem(item);
    const response = await addBookmark(itemId);
    if (!response) {
      removeBookmarksItem(item);
    }
    return true;
  };

  const handleRemoveBookmark = async (item: AnimeObject): Promise<boolean> => {
    const itemId = item.id;
    const response = await removeBookmark(itemId);
    if (response) {
      removeBookmarksItem(item);
      return true;
    }
    return false;
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const handleSignupClick = () => {
    setShowLoginModal(false);
    navigate("/register");
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current || !searchResults) {
      return;
    }
    setRankedSearchItems(searchResults.filter((item) => isItemRanked(item)));
    setBookmarkedSearchItems(
      searchResults.filter((item) => isItemBookmarked(item))
    );
    setUnattachedSearchItems(
      searchResults.filter(
        (item) => !isItemRanked(item) && !isItemBookmarked(item)
      )
    );
    isMounted.current = true;
  }, [searchResults, isItemRanked, isItemBookmarked]);

  return (
    <>
      {showLoginModal && (
        <LoginModal
          handleLoginClick={handleLoginClick}
          handleSignupClick={handleSignupClick}
          closeLoginModal={closeLoginModal}
        />
      )}
      {showRankingModal && (
        <RankingModal
          item={rankingItem}
          rankings={rankings}
          appendRankingItem={appendRankingItem}
          onClose={closeRankingModal}
          updateShowRankingModal={setShowRankingModal}
          removeBookmarksItem={removeBookmarksItem}
        />
      )}
      <div className="flex justify-center pr-6 pl-6">
        <div className="w-full max-w-md">
          <ul className="divide-y divide-gray-200">
            {rankedSearchItems.map((item: AnimeObject) => (
              <li key={item.id} className="flex py-4">
                <SearchItem
                  item={item}
                  isAdded={isItemRanked(item)}
                  isBookmarked={isItemBookmarked(item)}
                  handleAddBookmark={handleAddBookmark}
                  handleRemoveBookmark={handleRemoveBookmark}
                  handleAddAnime={openRankingModal}
                />
              </li>
            ))}
            {bookmarkedSearchItems.map((item: AnimeObject) => (
              <li key={item.id} className="flex py-4">
                <SearchItem
                  item={item}
                  isAdded={isItemRanked(item)}
                  isBookmarked={isItemBookmarked(item)}
                  handleAddBookmark={handleAddBookmark}
                  handleRemoveBookmark={handleRemoveBookmark}
                  handleAddAnime={openRankingModal}
                />
              </li>
            ))}
            {unattachedSearchItems.map((item: AnimeObject) => (
              <li key={item.id} className="flex py-4">
                <SearchItem
                  item={item}
                  isAdded={isItemRanked(item)}
                  isBookmarked={isItemBookmarked(item)}
                  handleAddBookmark={handleAddBookmark}
                  handleRemoveBookmark={handleRemoveBookmark}
                  handleAddAnime={openRankingModal}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchList;
