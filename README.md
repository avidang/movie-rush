# Movie Rush

Movie Rush displays movies using the TMDB API. It is built with React, TypeScript, Vite, and TanStack Router.

## Requirements

- Node.js 18+
- A TMDB API key

## Environment variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Required variable:

- `VITE_TMDB_API_KEY`: your TMDB API key used for all movie API requests.

## Run with pnpm

```bash
pnpm install
pnpm dev
```

## Run with npm

```bash
npm install
npm run dev
```

The app will start on Vite's local dev server at `http://localhost:3000`.
