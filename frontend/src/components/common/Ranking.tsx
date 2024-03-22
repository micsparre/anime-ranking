import React from "react";
import { UserAnimeObject } from "./types";
import RankingModal from "./RankingModal";

interface RankingProps {
  rankingItem: UserAnimeObject;
  setRankingItem: (item: UserAnimeObject) => void;
  animeList: UserAnimeObject[];
  onClose: () => Promise<boolean>;
}

const Ranking: React.FC<RankingProps> = ({
  rankingItem,
  animeList,
  onClose,
}) => {
  return (
    <RankingModal item={rankingItem} animeList={animeList} onClose={onClose} />
  );
};

export default Ranking;
