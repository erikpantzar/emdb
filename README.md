# Eriks Movie Database

Live at https://erikpantzar.github.io/emdb/

Browse movies, people and themes from [The Movie Database](https://www.themoviedb.org/).

## Run it

1. Get an API key (v3) from https://www.themoviedb.org/settings/api
2. Copy `.env.example` to `.env` and put the key in `VITE_TMDB_KEY`
3. `npm install`
4. `npm run dev` and open http://localhost:5173/emdb/ (the app lives under `/emdb/`, same as on GitHub Pages)

`npm run build` makes a production build in `dist/`, `npm run preview` serves it.

The `.env` file is gitignored, never commit the key.

## Deploy

Every push to `master` builds and deploys to GitHub Pages with the workflow in `.github/workflows/deploy.yml`. The TMDB key comes from the `VITE_TMDB_KEY` repo secret.
