import React from "react";
import { AnimeObject } from "./types";
import getDescription from "./utils";
import { FaSpinner, FaCheck } from "react-icons/fa";

interface AnimeItemProps {
  item: AnimeObject;
  isAdded: boolean;
  onItemClickAdd: (item: AnimeObject) => void;
  onItemClickRemove: (item: AnimeObject) => void;
  loading: boolean;
}

const AnimeItem: React.FC<AnimeItemProps> = ({
  item,
  isAdded,
  onItemClickAdd,
  onItemClickRemove,
  loading,
}) => {
  return (
    <>
      <div className="ml-4 mr-10">
        <div className="text-lg font-medium text-gray-900">{item.title}</div>
        <div className="text-sm text-gray-500">{getDescription(item)}</div>
      </div>
      <div className="ml-auto flex mt-1">
        {isAdded ? (
          <button
            onClick={() => onItemClickRemove(item)}
            className="bg-green-500 hover:bg-red-700 text-white font-bold px-4 rounded flex items-center justify-center h-10 w-10"
          >
            <FaCheck />
          </button>
        ) : loading ? (
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
    </>
  );
};

export default AnimeItem;
