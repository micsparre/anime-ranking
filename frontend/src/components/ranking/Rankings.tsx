import React, { useState, useEffect } from "react";
import RankingList from "./RankingList";
import { RankingsObject } from "../common/types";
import LoadingSpinner from "../common/LoadingSpinner";
import DisplayMessage from "../common/DisplayMessage";

interface RankingsProps {
  rankings: RankingsObject[];
  removeRankingItem: (ranking: RankingsObject) => void;
  isUserLoading: boolean;
}

const Rankings: React.FC<RankingsProps> = ({
  rankings,
  removeRankingItem,
  isUserLoading,
}) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (rankings && rankings.length === 0) {
      setMessage("No rankings yet. Try adding some!");
    } else {
      setMessage("");
    }
  }, [rankings, setMessage]);
  return (
    <>
      {(isUserLoading && <LoadingSpinner />) || (
        <>
          {message ? (
            <DisplayMessage isMiddle={true} message={message} />
          ) : (
            <div className="bg-gray-100 min-h-screen">
              <RankingList
                rankings={rankings}
                removeRankingItem={removeRankingItem}
                isUserLoading={isUserLoading}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Rankings;
