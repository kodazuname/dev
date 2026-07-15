from sqlalchemy import crete_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL='sqlite:///./movie.db'
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)