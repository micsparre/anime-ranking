import { Anime } from "./Types";

const getDescription = (anime: Anime) => {
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

export default getDescription;
