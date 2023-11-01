# todo

## backend

- add email verification after a user signs up
  - isVerified flag?
- bookmark object added to User's bookmarks field
  - whether an anime show is bookmarked
  - api to retrieve user's bookmarked anime shows
- add ability to delete account (and all associated data)
- server-side validation for user input
- add logging
  - requests
  - errors

## frontend

- add button to refresh recommendations
- add option to delete account on [AccountPage.tsx](frontend/components/AccountPage.tsx)
- add ability to bookmark anime shows
  - add bookmark button to the search page
  - add bookmark button to the recommendation page
  - [Bookmarks.tsx](frontend/components/pages/BookmarksPage.tsx):
    - similar to [UserList.tsx](frontend/components/pages/UserList.tsx)
    - displays a list of items that the user has added to their bookmarks
    - needs a bookmark button on search and recommendation pages
- add ranking modal when adding an anime to your list
- click an anime item object to open a detailed modal
  - displays more information about the anime
  - add a button to add the anime to your list
- loading spinner on load of user anime list

## other

- CICD pipeline
  - github actions?
  - docker?
- deploy website
  - heroku?
- deploy backend
  - postgres vs sqlite?
  - where?
- add a [LICENSE](LICENSE)

## bugs

- navbar buttons clickable while recommendations loading
- lists dropdown not closable
