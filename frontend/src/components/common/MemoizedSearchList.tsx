import React from "react";
import SearchList, { SearchListProps } from "./SearchList";

export const MemoizedSearchList: React.FC<SearchListProps> =
  React.memo(SearchList);
export default MemoizedSearchList;
