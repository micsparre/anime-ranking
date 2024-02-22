# todo

## backend

- incorporate rankings into recommendation flow
- add ability to delete account (and all associated data)
- server-side validation for user input
- add email verification after a user signs up
  - isVerified flag?
- limit number of recommendations per day
- add ability to change password
- add user verification with frontend token for status checking

## frontend

- ranking modal
  - show ranking on page after finishing ranking flow
  - x in top right corner to close modal
- click an anime item object to open a detail modal
  - displays more information about the anime
  - add a button to add the anime to your list
- add option to delete account on [AccountPage.tsx](frontend/components/AccountPage.tsx)
- refactor recommendations page
  - add customability of recommendations (genre, type, length, date, etc.)
  - display number of recommendations left for the day
- error catching when backend not responding (leads to white screen on home page)

## other

- CICD pipeline?
  - github actions
- add a [LICENSE](LICENSE)

## bugs

- search titles sorting does not work correctly

## nice to haves

- react query for caching
- change font?
- friends / social features
- export lists
- display messages on lists and bookmarks pages when there are no items
- exit from ranking an anime (escape)
- recommendations rate-limiting
