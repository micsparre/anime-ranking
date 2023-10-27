# todo

## backend

- add email verification after a user signs up
  - isVerified flag?
- bookmark field added to User's Anime table
  - add flag
    - whether an anime show is bookmarked or not
  - api to retrieve user's bookmarked anime shows
- add ability to delete account (and all associated data)

## frontend

- add button to refresh recommendations
- un-duplicate repeated logic from [Recommendation.tsx](frontend/components/Recommendation.tsx) and [AnimeItemList.tsx](frontend/components/common/AnimeItemList.tsx)
- add option to delete account on [AccountPage.tsx](frontend/components/AccountPage.tsx)
- add ability to bookmark anime shows
  - add bookmark button to the search page
  - add bookmark button to the recommendation page
  - [BookmarksPage.tsx](frontend/components/pages/BookmarksPage.tsx):
    - similar to [UserAnimeItemList.tsx](frontend/components/pages/UserAnimeItemList.tsx)
    - displays a list of items that the user has added to their bookmarks
    - needs a bookmark button on search and recommendation pages
- add ranking modal when adding an anime to your list
