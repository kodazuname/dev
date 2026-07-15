from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, engine, Base, MovieModel
from schemas import Movie, MovieCreate

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Создаем таблицы в movie.db при старте
    Base.metadata.create_all(bind=engine)
    
    # Пытаемся запустить Seed Script (заполнить базу из data.py)
    db = next(get_db())
    if db.query(MovieModel).count() == 0:
        try:
            # Предполагается, что в файле data.py есть список словарей с фильмами
            from data import movies_data 
            for m in movies_data:
                db.add(MovieModel(**m))
            db.commit()
            print("База данных успешно заполнена из data.py!")
        except Exception as e:
            print(f"Сидирование пропущено: {e}")
    yield


app = FastAPI(title="Movie API", lifespan=lifespan)


# Разрешаем фронтенду общаться с бэкендом
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/movies", response_model=list[Movie])
def get_movies(db: Session = Depends(get_db)):
    return db.query(MovieModel).all()


@app.post("/api/movies", response_model=Movie, status_code=status.HTTP_201_CREATED)
def create_movie(movie_data: MovieCreate, db: Session = Depends(get_db)):
    new_movie = MovieModel(**movie_data.model_dump())
    db.add(new_movie)
    db.commit()
    db.refresh(new_movie)
    return new_movie


@app.get("/api/movies/{movie_id}", response_model=Movie)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(MovieModel).filter(MovieModel.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie


@app.delete("/api/movies/{movie_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(MovieModel).filter(MovieModel.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    db.delete(movie)
    db.commit()