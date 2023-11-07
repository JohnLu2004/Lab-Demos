from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from services.Labs import *

class Base(DeclarativeBase):
  pass

class User(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String)