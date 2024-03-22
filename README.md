# jaku

Rank the animes you've watched against each other, bookmark the shows you plan to watch, and get personalized recommendations.

https://github.com/micsparre/jaku/assets/67245304/19d484ef-4e5f-413a-a58f-721e6746391b

## Local Development Setup

### Backend (Django)

#### Start the server

```bash
cd backend
py manage.py runserver
```

#### Update DB with new models

```bash
cd backend
py manage.py makemigrations
py manage.py migrate
```

### Frontend (Vite + React + Typescript + Tailwind)

#### Start the React server

```bash
cd frontend
npm run dev
```
