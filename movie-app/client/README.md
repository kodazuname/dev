# Movie App

A small full-stack movie catalog built with React, TypeScript, and FastAPI. It supports creating, reading, updating, and deleting movies alongside title search, genre filtering, sorting, and favorites.

## Development

Start the FastAPI backend from the repository root:

```bash
cd server
uv sync
uv run fastapi dev
```

Then start the React client in another terminal:

```bash
cd client
npm install
npm run dev
```

Open the URL printed by Vite. Requests beginning with `/api` are forwarded to FastAPI during development.

Movie changes are stored in memory and reset when the FastAPI server restarts.

Other available commands:

```bash
npm run lint
npm run build
npm run preview
```

## Project structure

```text
src/
  api/          FastAPI requests
  components/   Presentational movie catalog components
  hooks/        Catalog state and derived behavior
  types/        Shared domain types
  App.tsx       Page composition
```

## Built with

- React
- TypeScript
- Vite
- Tailwind CSS
- Oxlint
- FastAPI
