# todo

## backend

- incorporate rankings into recommendation flow
- add ability to delete account (and all associated data)
- server-side validation for user input
- add logging
  - requests
  - errors
- add email verification after a user signs up
  - isVerified flag?

## frontend

- ranking modal
  - add ranking modal to bookmarks and recommendations pages
  - show ranking on page after finishing ranking flow
  - x in top right corner to close modal
- click an anime item object to open a detail modal
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
- login remembering username / password (local storage?, autofill?)

## questions

- should I include movies or not?
