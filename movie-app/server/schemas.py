from pydantic import BaseModel, Field
from typing import Optional


class MovieBase(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    genre: str = Field(min_length=1, max_length=50)
    release_year: int = Field(gt=0)
    description: str = Field(min_length=1, max_length=1000) # увеличили лимит для описаний
    rating: float = Field(ge=0, le=10)
    main_character: Optional[str] = None # Добавили твое поле из базы!


class MovieCreate(MovieBase):
    pass


class Movie(MovieBase):
    id: int
    poster_url: Optional[str] = None

    class Config:
        from_attributes = True