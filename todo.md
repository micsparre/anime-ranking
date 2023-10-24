# todo

## backend

- add email verification after a user signs up
  - isVerified flag?
- recommendation system
- bookmarks database table
  - fields
    - user_id
    - anime_id
    - created_at
  - api to retrieve user's bookmarked anime shows

## frontend

- BookmarksPage.tsx:
  - similar to [AnimeList.tsx](frontend/components/AnimeList.tsx)
  - displays a list of items that the user has added to their bookmarks
  - needs a bookmark button on search and recommendation pages
- rename folders / files
  - [AnimeList.tsx](frontend/components/AnimeList.tsx) -> [AnimeListPage.tsx](frontend/components/AnimeListPage.tsx)
  - [Recommendation.tsx](frontend/components/Recommendation.tsx) -> [RecommendationsPage.tsx](frontend/components/RecommendationsPage.tsx)
  - [TitleSearch.tsx](frontend/components/Search/TitleSearch.tsx) -> [Home.tsx](frontend/components/Home.tsx) -> [HomePage.tsx](frontend/components/HomePage.tsx)
  - [Account.tsx](frontend/components/Account.tsx) -> [AccountPage.tsx](frontend/components/AccountPage.tsx)
  - [Login.tsx](frontend/components/Login.tsx) -> [LoginPage.tsx](frontend/components/LoginPage.tsx)
  - [Register.tsx](frontend/components/Register.tsx) -> [RegisterPage.tsx](frontend/components/RegisterPage.tsx)
  - [ItemList.tsx](frontend/components/ItemList.tsx) -> [SearchItems.tsx](frontend/components/SearchItems.tsx)
  - [AnimeList/](frontend/components/AnimeList) -> [UserLists/](frontend/components/UserLists)
  - [Auth](frontend/components/Auth) -> [AuthPages](frontend/components/AuthPages)
