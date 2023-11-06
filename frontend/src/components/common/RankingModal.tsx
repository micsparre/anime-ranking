import React, { useState, useEffect } from "react";
import { UserAnimeObject, AnimeObject } from "./types";
import api from "./api";

interface RankingModalProps {
  item: UserAnimeObject;
  animeList: UserAnimeObject[];
  onClose: () => void;
}

const RankingModal: React.FC<RankingModalProps> = ({
  item,
  animeList,
  onClose,
}) => {
  const [rankingGroup, setRankingGroup] = useState<string | null>(null);
  const [rankingItemIndex, setRankingItemIndex] = useState<number | null>(null);
  const [rankingList, setRankingList] = useState<UserAnimeObject[]>(
    [] as UserAnimeObject[]
  );
  const [bounds, setBounds] = useState<number[]>([0, 1000]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setRankingGroup(null);
    setRankingItemIndex(null);
    const sortedAnimeList = animeList.sort((a, b) => a.ranking - b.ranking);
    setRankingList([...sortedAnimeList]);
  }, []);

  useEffect(() => {
    if (rankingGroup !== null && !isFinished) {
      setBounds([0, rankingList.length]);
      const midIndex = Math.floor(rankingList.length / 2);
      setRankingItemIndex(midIndex);
    } else if (isFinished) {
      handleSubmit();
    }
  }, [rankingList]);

  useEffect(() => {
    if (bounds[0] >= bounds[1]) {
      setIsFinished((prevState) => true);
      console.log("found match");
      const newRankingList = [...rankingList];
      newRankingList.splice(bounds[0], 0, item);
      setRankingList(newRankingList);
    } else {
      const midIndex = Math.floor((bounds[0] + bounds[1]) / 2);
      setRankingItemIndex(midIndex);
    }
  }, [bounds]);

  const handleRanking = (isHigher: boolean) => {
    // isHigher is true if the chosen ranking is higher than the current anime's intrinsic ranking
    if (rankingItemIndex !== null) {
      setBounds((prevBounds) => {
        if (!isHigher) {
          return [rankingItemIndex + 1, prevBounds[1]];
        } else {
          return [prevBounds[0], rankingItemIndex];
        }
      });
    }
  };

  const assignRankings = async () => {
    let maxValue = 0;
    let minValue = 0;
    if (rankingGroup === "bad") {
      minValue = 0;
      maxValue = 3.3;
    } else if (rankingGroup === "mid") {
      minValue = 3.4;
      maxValue = 6.6;
    } else if (rankingGroup === "good") {
      minValue = 6.7;
      maxValue = 10;
    }

    for (let i = 0; i < rankingList.length; i++) {
      // Calculate the value as a fraction of the position relative to the total length
      const fraction = (i + 1) / rankingList.length;

      // Scale the fraction to the specified range
      const value = minValue + fraction * (maxValue - minValue);
      rankingList[i].ranking = parseFloat(value.toFixed(2));
    }
  };

  const handleSubmit = async () => {
    await assignRankings();
    try {
      api.post(
        "/api/rank-anime",
        rankingList.map((item) => ({
          anime_id: item.id,
          ranking: item.ranking,
        }))
      );
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRankingGroup = (rankingGroup: string) => {
    setRankingGroup(rankingGroup);
    if (rankingGroup === "good") {
      setRankingList(rankingList.filter((item) => item.ranking >= 6.7));
    } else if (rankingGroup === "mid") {
      setRankingList(
        rankingList.filter((item) => item.ranking >= 3.4 && item.ranking < 6.7)
      );
    } else if (rankingGroup === "bad") {
      setRankingList(rankingList.filter((item) => item.ranking < 3.4));
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center block p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden inline-block align-middle h-screen"
          aria-hidden="true"
        ></span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white p-5 pb-4">
            <div className="text-left">
              <h3
                className="text-sm leading-6 font-medium text-gray-400"
                id="modal-headline"
              >
                Ranking: <i>{item.title}</i>
              </h3>
            </div>
            <div className="flex justify-center">
              <div className="mt-2">
                {(rankingGroup !== null &&
                  rankingItemIndex !== null &&
                  !isFinished && (
                    <div className="mt-4 justify-center items-center grid grid-cols-2 gap-x-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => handleRanking(false)}
                      >
                        <div className="text-sm">{item.title}</div>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => handleRanking(true)}
                      >
                        <div className="text-sm">
                          {rankingList[rankingItemIndex] !== undefined &&
                            rankingList[rankingItemIndex].title}
                        </div>
                      </button>
                    </div>
                  )) || (
                  <div className="mt-4 justify-center items-center grid grid-cols-3 gap-x-10">
                    <div className="flex flex-col items-center justify-center">
                      <button
                        type="button"
                        className=" items-center justify-center w-10 h-10 rounded-full bg-green-400 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => handleRankingGroup("good")}
                      ></button>
                      <div className="mb-2 items-center justify-center text-gray-400">
                        I liked it
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        onClick={() => handleRankingGroup("mid")}
                      ></button>
                      <div className="mb-2 text-gray-400">It was ok</div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => handleRankingGroup("bad")}
                      ></button>
                      <div className="mb-2 text-gray-400">I didn't like it</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingModal;
