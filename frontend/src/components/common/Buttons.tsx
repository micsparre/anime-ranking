import React from "react";
import { AnimeObject } from "./types";

interface ButtonProps {
  handleClick: (item: AnimeObject) => void;
  item: AnimeObject;
}

interface BookmarkButtonProps {
  handleClick: (item: AnimeObject) => void;
  item: AnimeObject;
  isBookmarked: boolean;
}

export const AddButton: React.FC<ButtonProps> = ({ item, handleClick }) => {
  return (
    <button
      onClick={() => handleClick(item)}
      className="inline-flex items-center justify-center w-8 h-8 mr-2 text-gray-950 border-2 border-gray-950 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-gray-950 hover:text-indigo-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  );
};

export const RemoveButton: React.FC<ButtonProps> = ({ item, handleClick }) => {
  return (
    <button
      onClick={() => handleClick(item)}
      className="h-7 w-7 mt-2 text-indigo-100 transition-colors duration-150 bg-gray-300 rounded-full focus:shadow-outline hover:bg-red-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#FFFFFF"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  item,
  handleClick,
  isBookmarked,
}) => {
  return (
    <button
      onClick={() => handleClick(item)}
      className="inline-flex items-center justify-center w-9 h-9 focus:shadow-outline"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isBookmarked ? "#030712" : "none"}
        viewBox="0 0 24 24"
        strokeWidth="1.3"
        stroke="#030712"
      >
        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
      </svg>
    </button>
  );
};

export const CheckButton: React.FC = () => {
  return (
    <div className="inline-flex items-center justify-center w-8 h-8 text-indigo-100 transition-colors duration-150 border-2 border-green-600 rounded-full focus:shadow-outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#16a34a"
        strokeWidth="1.5"
      >
        <path d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </div>
  );
};
