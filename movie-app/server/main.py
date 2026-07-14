from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from typing import List

from schemas import Movie, MovieCreate

app = FastAPI(title="Movie API")

# Разрешаем фронтенду общаться с бэкендом без ошибок CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "movie.db"
DEFAULT_POSTER_URL = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500"


def get_db_connection():
    """Создает подключение к SQLite базе данных."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Чтобы обращаться к полям по именам, а не по индексам
    return conn


@app.get("/")
def home():
    return {"message": "Welcome to the Movie API connected to SQLite!"}


@app.get("/api/movies", response_model=List[Movie])
def get_movies():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, release_year, genre, rating, main_character, description, poster_url FROM movie")
    rows = cursor.fetchall()
    conn.close()

    movies = []
    for row in rows:
        movie_dict = dict(row)
        # Если poster_url пустой в базе, даем дефолтную картинку
        if not movie_dict.get("poster_url"):
            movie_dict["poster_url"] = DEFAULT_POSTER_URL
        movies.append(movie_dict)
    return movies


@app.post("/api/movies", response_model=Movie, status_code=status.HTTP_201_CREATED)
def create_movie(movie_data: MovieCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO movie (title, release_year, genre, rating, main_character, description, poster_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                movie_data.title,
                movie_data.release_year,
                movie_data.genre,
                movie_data.rating,
                movie_data.main_character,
                movie_data.description,
                DEFAULT_POSTER_URL
            )
        )
        conn.commit()
        new_id = cursor.lastrowid
        conn.close()

        return Movie(
            id=new_id,
            poster_url=DEFAULT_POSTER_URL,
            **movie_data.model_dump()
        )
    except Exception as e:
        conn.rollback()
        conn.close()
        raise HTTPException(status_code=400, detail=f"Database error: {str(e)}")


@app.get("/api/movies/{movie_id}", response_model=Movie)
def get_movie(movie_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, title, release_year, genre, rating, main_character, description, poster_url FROM movie WHERE id = ?",
        (movie_id,)
    )
    row = cursor.fetchone()
    conn.close()

    if row is None:
        raise HTTPException(status_code=404, detail="Movie not found")

    movie_dict = dict(row)
    if not movie_dict.get("poster_url"):
        movie_dict["poster_url"] = DEFAULT_POSTER_URL
    return movie_dict


# ==========================================
# ВРЕМЕННО ЗАКОМЕНТИРОВАНО (ФУНКЦИИ ИЗМЕНЕНИЯ И УДАЛЕНИЯ)
# ==========================================

# @app.put("/api/movies/{movie_id}", response_model=Movie)
# def update_movie(movie_id: int, movie_data: MovieCreate):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     
#     # Сначала проверим, есть ли такой фильм
#     cursor.execute("SELECT poster_url FROM movie WHERE id = ?", (movie_id,))
#     row = cursor.fetchone()
#     if row is None:
#         conn.close()
#         raise HTTPException(status_code=404, detail="Movie not found")
#     
#     current_poster = row["poster_url"] if row["poster_url"] else DEFAULT_POSTER_URL
# 
#     try:
#         cursor.execute(
#             """
#             UPDATE movie
#             SET title = ?, release_year = ?, genre = ?, rating = ?, main_character = ?, description = ?
#             WHERE id = ?
#             """,
#             (
#                 movie_data.title,
#                 movie_data.release_year,
#                 movie_data.genre,
#                 movie_data.rating,
#                 movie_data.main_character,
#                 movie_data.description,
#                 movie_id
#             )
#         )
#         conn.commit()
#         conn.close()
# 
#         return Movie(
#             id=movie_id,
#             poster_url=current_poster,
#             **movie_data.model_dump()
#         )
#     except Exception as e:
#         conn.rollback()
#         conn.close()
#         raise HTTPException(status_code=400, detail=f"Database error: {str(e)}")


# @app.delete("/api/movies/{movie_id}", status_code=status.HTTP_204_NO_CONTENT)
# def delete_movie(movie_id: int):
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     
#     # Проверяем существование
#     cursor.execute("SELECT id FROM movie WHERE id = ?", (movie_id,))
#     if cursor.fetchone() is None:
#         conn.close()
#         raise HTTPException(status_code=404, detail="Movie not found")
# 
#     cursor.execute("DELETE FROM movie WHERE id = ?", (movie_id,))
#     conn.commit()
#     conn.close()
#     return None