from pydantic import BaseModel
from typing import Optional

class MovieBase(BaseModel):
    title: str
    genre: Optional[str] = None
    release_year: Optional[int] = None
    description: Optional[str] = None
    rating: Optional[float] = None
    poster_url: Optional[str] = None

class MovieCreate(MovieBase):
    pass

class Movie(MovieBase):
    id: int

    class Config:
        from_attributes = True  # Разрешаем читать данные из базы SQLAlchemy