import React, { useState } from "react";
import { UserAnimeObject, AnimeObject } from "./types";
import axios from "axios";

interface RankingModalProps {
  item: AnimeObject;
  animeList: UserAnimeObject[];
  onClose: () => void;
}

const RankingModal: React.FC<RankingModalProps> = ({
  item,
  animeList,
  onClose,
}) => {
  const [ranking, setRanking] = useState<number | null>(null);
  const [generalRanking, setGeneralRanking] = useState<string | null>(null);
  const [rankingItemIndex, setRankingItemIndex] = useState<number | null>(null);
  const [indexesSearched, setIndexesSearched] = useState<number[]>([]);
  const [rankingList, setRankingList] = useState<UserAnimeObject[]>(
    [] as UserAnimeObject[]
  );
  const [bounds, setBounds] = useState<number[]>([0, 0]);

  const handleRanking = (isHigher: boolean) => {
    if (isHigher && rankingItemIndex !== null) {
      setBounds([rankingItemIndex, bounds[1]]);
    } else if (!isHigher && rankingItemIndex !== null) {
      setBounds([bounds[0], rankingItemIndex]);
    }
    const midIndex = Math.floor((bounds[0] + bounds[1]) / 2);
    setRankingItemIndex(midIndex);
    setIndexesSearched([...indexesSearched, midIndex]);
  };

  const handleSubmit = async () => {
    if (ranking !== null) {
      try {
        await axios.post(
          "/api/ranking",
          animeList.map((item) => ({
            anime_id: item.id,
            ranking: item.ranking,
          }))
        );
        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleGeneralRanking = (generalRanking: string) => {
    setGeneralRanking(generalRanking);
    if (generalRanking === "good") {
      setRankingList(animeList.filter((item) => item.ranking >= 6.6));
    } else if (generalRanking === "mid") {
      setRankingList(
        animeList.filter((item) => item.ranking >= 3.3 && item.ranking < 6.6)
      );
    } else if (generalRanking === "bad") {
      setRankingList(animeList.filter((item) => item.ranking < 3.3));
    }
    setBounds([0, rankingList.length - 1]);
    const midIndex = Math.floor(rankingList.length / 2);
    setRankingItemIndex(midIndex);
    setIndexesSearched([...indexesSearched, midIndex]);
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
                {(generalRanking !== null && rankingItemIndex !== null && (
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
                        {rankingList[rankingItemIndex].title}
                      </div>
                    </button>
                  </div>
                )) || (
                  <div className="mt-4 justify-center items-center grid grid-cols-3 gap-x-10">
                    <div className="flex flex-col items-center justify-center">
                      <button
                        type="button"
                        className=" items-center justify-center w-10 h-10 rounded-full bg-green-400 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => handleGeneralRanking("good")}
                      ></button>
                      <div className="mb-2 items-center justify-center text-gray-400">
                        I liked it
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        onClick={() => handleGeneralRanking("mid")}
                      ></button>
                      <div className="mb-2 text-gray-400">It was ok</div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-400 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => handleGeneralRanking("bad")}
                      ></button>
                      <div className="mb-2 text-gray-400">I didn't like it</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 px-6 flex flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 ml-3 w-auto text-sm"
              onClick={handleSubmit}
              disabled={ranking === null}
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 mt-0 ml-3 w-auto text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingModal;
