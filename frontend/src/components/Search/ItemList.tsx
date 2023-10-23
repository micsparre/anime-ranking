import React, { useState, useEffect } from "react";
import api from "../Shared/api";
import { Anime } from "../Shared/Types";
import { FaSpinner, FaCheck } from "react-icons/fa";
import getDescription from "../Shared/Anime";

interface ItemListProps {
  items: Anime[];
  loading: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ items, loading }) => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [searched, setSearched] = useState(false);
  const [addAnimeLoading, setAddAnimeLoading] = useState<Anime>();
  const [sortedItems, setSortedItems] = useState<Anime[]>([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    api
      .get(apiUrl + "/api/anime-list")
      .then((response) => {
        setAnimeList(response.data);
        const sorted = items.reduce((acc: any[], anime: Anime) => {
          if (isAnimeAdded(anime)) {
            acc.unshift(anime);
          } else {
            acc.push(anime);
          }
          return acc;
        }, [] as Anime[]);
        setSortedItems(sorted);
      })
      .catch((error) => {
        setSortedItems(items);
      });
  }, [items]);

  useEffect(() => {
    if (loading) {
      setSearched(true);
    } else if (items.length === 0 && !loading && searched) {
      setSearchMessage("No results found. Please try another search.");
    } else {
      setSearchMessage("");
    }
  }, [items, loading, searched]);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const onItemClickAdd = (item: Anime) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { anime_id: item.id, title: item.title };
    const isLoggedIn = localStorage.getItem("token") !== null;
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setAddAnimeLoading(item);
    api
      .post(apiUrl + "/api/add-anime-to-list", itemData)
      .then((response) => {
        setAnimeList([...animeList, item]);
      })
      .catch((error) => {
        console.error("Error fetching item created details:", error);
      });
  };

  const handleLoginClick = () => {
    setShowLoginPrompt(false);
    window.location.href = "/login";
  };

  const handleSignupClick = () => {
    setShowLoginPrompt(false);
    window.location.href = "/register";
  };

  const onItemClickRemove = (item: Anime) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const itemData = { anime_id: item.id };
    setAddAnimeLoading(item);
    api
      .post(apiUrl + "/api/remove-anime-from-list", itemData)
      .then((response) => {
        setAnimeList(animeList.filter((anime) => anime.id !== item.id));
      })
      .catch((error) => {
        console.error("Error fetching item removed details:", error);
      });
    setAddAnimeLoading(undefined);
  };

  const isAnimeAdded = (anime: Anime) => {
    return animeList.some((item) => item.id === anime.id);
  };

  return (
    <>
      {showLoginPrompt && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      You need to log in or sign up first
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You must be logged in to add an anime to your list.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleLoginClick}
                >
                  Log in
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSignupClick}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <FaSpinner
          className="w-12 h-12 text-blue-500 absolute inset-0 m-auto animate-spin"
          style={{ display: loading ? "block" : "none" }}
        />
      ) : (
        <div className="w-full max-w-md mx-auto">
          {searchMessage ? (
            <div className="text-gray-500 text-xl text-center">
              {searchMessage}
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {sortedItems.map((item: Anime) => (
                <li key={item.id} className="flex py-4">
                  <div className="ml-4">
                    <div className="text-lg font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getDescription(item)}
                    </div>
                  </div>
                  <div className="ml-auto flex relative mt-1">
                    {isAnimeAdded(item) ? (
                      <button
                        onClick={() => onItemClickRemove(item)}
                        className="bg-green-500 hover:bg-red-700 text-white font-bold px-4 rounded flex items-center justify-center h-10 w-10"
                      >
                        <FaCheck />
                      </button>
                    ) : addAnimeLoading === item ? (
                      <FaSpinner className="w-10 h-10 text-blue-500 animate-spin" />
                    ) : (
                      <button
                        onClick={() => onItemClickAdd(item)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center h-10 w-10"
                      >
                        +
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default ItemList;
