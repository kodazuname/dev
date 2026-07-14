# Movie API

A minimal FastAPI backend that serves movie data to the React client.

## Development

Install the Python dependencies and start the development server:

```bash
uv sync
uv run fastapi dev
```

The API runs at <http://127.0.0.1:8000>. Interactive API documentation is available at <http://127.0.0.1:8000/docs>.

Movie changes are stored in memory and reset whenever the server restarts.

## API routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/movies` | Get all movies |
| `GET` | `/api/movies/{movie_id}` | Get one movie |
| `POST` | `/api/movies` | Create a movie |
| `PUT` | `/api/movies/{movie_id}` | Replace a movie's editable details |
| `DELETE` | `/api/movies/{movie_id}` | Delete a movie |

## Project structure

```text
main.py      FastAPI application and routes
schemas.py   Movie response model
data.py      In-memory movie records
```
