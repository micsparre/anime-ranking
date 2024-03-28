import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Rankings from "./ranking/Rankings";
import Recommendations from "./recommendation/Recommendations";
import Bookmarks from "./bookmark/Bookmarks";
import Account from "./authentication/Account";
import Navbar from "./Navbar";
import Search from "./search/Search";
import { useEffect, useState, useCallback, useRef } from "react";
import { getRankings, getBookmarks, getUserDetails } from "./common/api";
import { RankingsObject, AnimeObject, User } from "./common/types";

const CustomRouter: React.FC = () => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });
  const [rankings, setRankings] = useState<RankingsObject[]>([]);
  const [bookmarks, setBookmarks] = useState<AnimeObject[]>([]);
  const [recommendations, setRecommendations] = useState<AnimeObject[]>([]);
  const [userDetails, setUserDetails] = useState<User>({} as User);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const isMounted = useRef(false);

  const fetchUserData = useCallback(() => {
    if (!token) {
      return;
    }
    setIsUserLoading(true);
    const rankingsPromise = getRankings();
    const bookmarksPromise = getBookmarks();
    const userDetailsPromise = getUserDetails();
    Promise.all([rankingsPromise, bookmarksPromise, userDetailsPromise])
      .then(([rankings, bookmarks, userDetails]) => {
        setRankings(rankings);
        setBookmarks(bookmarks);
        setUserDetails(userDetails);
        setIsUserLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsUserLoading(false);
      });
  }, [token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (token === null) {
      localStorage.removeItem("token");
      setRankings([]);
      setBookmarks([]);
      setRecommendations([]);
      setUserDetails({} as User);
    } else {
      localStorage.setItem("token", token);
      fetchUserData();
    }
  }, [token, fetchUserData]);

  const handleTokenChange = useCallback((token: string | null) => {
    setToken(token);
  }, []);

  const appendRankingItem = useCallback((ranking: RankingsObject) => {
    setRankings((r) => r.concat(ranking));
  }, []);

  const removeRankingItem = useCallback((ranking: RankingsObject) => {
    setRankings((r) => r.filter((item) => item.id !== ranking.id));
  }, []);

  const appendBookmarksItem = useCallback((bookmark: AnimeObject) => {
    setBookmarks((b) => b.concat(bookmark));
  }, []);

  const removeBookmarksItem = useCallback((bookmark: AnimeObject) => {
    setBookmarks((b) => b.filter((item) => item.id !== bookmark.id));
  }, []);

  const handleRecommendationsChange = useCallback(
    (recs: AnimeObject[]) => {
      setRecommendations(
        recs.filter(
          (rec: AnimeObject) =>
            !rankings.some((ranking: AnimeObject) => ranking.id === rec.id) &&
            !bookmarks.some((bookmark: AnimeObject) => bookmark.id === rec.id)
        )
      );
    },
    [setRecommendations, rankings, bookmarks]
  );
  const isLoggedIn = token !== null;

  return (
    <Router>
      <Navbar token={token} />
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login handleTokenChange={handleTokenChange} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Register handleTokenChange={handleTokenChange} />
            )
          }
        />
        <Route
          path="/rankings"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" />
            ) : (
              <Rankings
                rankings={rankings}
                removeRankingItem={removeRankingItem}
                isUserLoading={isUserLoading}
              />
            )
          }
        />
        <Route
          path="/bookmarks"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" />
            ) : (
              <Bookmarks
                rankings={rankings}
                bookmarks={bookmarks}
                appendRankingItem={appendRankingItem}
                removeBookmarksItem={removeBookmarksItem}
                isUserLoading={isUserLoading}
              />
            )
          }
        />
        <Route
          path="/recommendations"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" />
            ) : (
              <Recommendations
                rankings={rankings}
                bookmarks={bookmarks}
                recommendations={recommendations}
                appendRankingItem={appendRankingItem}
                appendBookmarksItem={appendBookmarksItem}
                removeBookmarksItem={removeBookmarksItem}
                handleRecommendationsChange={handleRecommendationsChange}
                isUserLoading={isUserLoading}
              />
            )
          }
        />
        <Route
          path="/account"
          element={
            isLoggedIn ? (
              <Account
                handleTokenChange={handleTokenChange}
                userDetails={userDetails}
                isUserLoading={isUserLoading}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            <Search
              token={token}
              rankings={rankings}
              bookmarks={bookmarks}
              appendRankingItem={appendRankingItem}
              appendBookmarksItem={appendBookmarksItem}
              removeBookmarksItem={removeBookmarksItem}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
export default CustomRouter;
