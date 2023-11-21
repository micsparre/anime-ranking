# todo

## backend

- incorporate rankings into recommendation flow
- add ability to delete account (and all associated data)
- server-side validation for user input
- add email verification after a user signs up
  - isVerified flag?
- keep track of costs due to volume attached to backend machine for sqlite
  - look into neon.tech free postgres?

## frontend

- ranking modal
  - show ranking on page after finishing ranking flow
  - x in top right corner to close modal
- click an anime item object to open a detail modal
  - displays more information about the anime
  - add a button to add the anime to your list
- add button to refresh recommendations
- add option to delete account on [AccountPage.tsx](frontend/components/AccountPage.tsx)

## other

- CICD pipeline
  - github actions
- add a [LICENSE](LICENSE)

## bugs

- login authentication
- remove bookmark from anime after adding it to your list (server-side)

## nice to haves

- react query for caching
- change font
- fix snorlax icon size
- friends / social features
- export lists
- display messages on lists and bookmarks pages when there are no items
- exit from ranking an anime (escape)
- recommendations rate-limiting

## questions

- should I include movies or not?
