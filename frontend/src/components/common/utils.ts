import { AnimeObject } from "./types";

export const getDescription = (anime: AnimeObject) => {
  const startDate = anime.start_date;
  const endDate = anime.end_date;
  let description = "";
  if (startDate && endDate) {
    description = `${startDate} - ${endDate}`;
  } else if (startDate) {
    description = `${startDate} - Present`;
  } else if (endDate) {
    description = `Ended on ${endDate}`;
  }

  const numEpisodes = anime.episodes;
  let episodes = "";
  if (numEpisodes) {
    if (numEpisodes === 1) {
      episodes = `${numEpisodes} episode`;
    } else {
      episodes = `${numEpisodes} episodes`;
    }
    if (description) {
      description = `${description} | ${episodes}`;
    } else {
      description = `${episodes}`;
    }
  }
  return description;
};

export const getRankingColor = (ranking: number, isText: boolean) => {
  if (!ranking) {
    if (isText) {
      return "text-gray-700";
    } else {
      return "bg-gray-100";
    }
  }
  if (ranking >= 6.7) {
    if (isText) {
      return "text-green-700";
    } else {
      return "bg-green-100";
    }
  } else if (ranking < 6.7 && ranking >= 3.4) {
    if (isText) {
      return "text-yellow-700";
    } else {
      return "bg-yellow-100";
    }
  } else {
    if (isText) {
      return "text-red-700";
    } else {
      return "bg-red-100";
    }
  }
};
