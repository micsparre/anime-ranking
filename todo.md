# todo

## backend

- add ability to delete account (and all associated data)
- server-side validation for user input
- add logging
  - requests
  - errors
- add email verification after a user signs up
  - isVerified flag?

## frontend

- add ranking modal when adding an anime to your list
- click an anime item object to open a detailed modal
  - displays more information about the anime
  - add a button to add the anime to your list
- add button to refresh recommendations
- add option to delete account on [AccountPage.tsx](frontend/components/AccountPage.tsx)

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
- lists dropdown not closable on re-click

## nice to haves

- react query for caching
