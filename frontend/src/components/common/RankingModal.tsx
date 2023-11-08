import React, { useState, useEffect } from "react";
import { UserAnimeObject } from "./types";
import api from "./api";
import { getRankingColor } from "./utils";

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
  }, [animeList]);

  useEffect(() => {
    if (rankingGroup !== null && !isFinished) {
      setBounds([0, rankingList.length]);
      const midIndex = Math.floor(rankingList.length / 2);
      setRankingItemIndex(midIndex);
    } else if (isFinished) {
      handleSubmit();
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg h-52">
            <div className="mt-5 px-4 text-left">
              <h3
                className="text-sm leading-6 font-medium text-gray-400"
                id="modal-headline"
              >
                Ranking: <i>{item.title}</i>
              </h3>
            </div>
            <div className="bg-white px-4 pb-5 pt-5">
              <div className="flex justify-center items-center">
                <div className="mt-2">
                  {(rankingGroup !== null &&
                    rankingItemIndex !== null &&
                    !isFinished && (
                      <div className="justify-center items-center grid grid-cols-2 gap-x-8">
                        <div className="text-sm leading-4">
                          <button
                            type="button"
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-40 h-28 relative flex flex-col items-center"
                            onClick={() => handleRanking(false)}
                          >
                            <div className="mt-2 flex overflow-hidden">
                              {item.title}
                            </div>
                          </button>
                        </div>
                        <div className="text-sm leading-4">
                          <button
                            type="button"
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow w-40 h-28 relative flex flex-col items-center"
                            onClick={() => handleRanking(true)}
                          >
                            <div className="mt-2 flex overflow-hidden">
                              {rankingList[rankingItemIndex] !== undefined &&
                                rankingList[rankingItemIndex].title}
                            </div>
                            <div
                              className={`flex items-center justify-center text-sm text-${getRankingColor(
                                rankingList[rankingItemIndex]?.ranking
                              )}-500`}
                            >
                              {rankingList[rankingItemIndex] !== undefined &&
                                rankingList[rankingItemIndex].ranking}
                            </div>
                          </button>
                        </div>
                      </div>
                    )) ||
                    (!isFinished && (
                      <div className="mt-4 justify-center items-center grid grid-cols-3 gap-x-10">
                        <div className="flex flex-col items-center justify-center">
                          <button
                            type="button"
                            className="items-center justify-center w-10 h-10 rounded-full bg-green-400 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
                          <div className="mb-2 text-gray-400">
                            I didn't like it
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingModal;
