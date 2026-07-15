from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, declarative_base

# Строго movie.db, как вы и просили
DATABASE_URL = 'sqlite:///./movie.db'

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class MovieModel(Base):
    __tablename__ = "movie"  # Имя таблицы

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    genre = Column(String, nullable=True)
    release_year = Column(Integer, nullable=True)
    description = Column(String, nullable=True)
    rating = Column(Float, nullable=True)
    poster_url = Column(String, nullable=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()