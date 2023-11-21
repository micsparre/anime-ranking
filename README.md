# anime-ranking

Rank the animes you've watched against each other, bookmark the shows you plan to watch, and get personalized recommendations.

## Local Development

### Backend

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

### Frontend

#### Start the React server

```bash
cd frontend
npm run start
```

#### Start the tailwind css watch

```bash
cd frontend
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```
