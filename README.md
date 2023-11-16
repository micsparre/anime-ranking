# anime-ranking

Rank the animes you've watched against each other

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
DJANGO_SETTINGS_MODULE=backend.dev_settings py manage.py makemigrations
DJANGO_SETTINGS_MODULE=backend.dev_settings py manage.py migrate
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
