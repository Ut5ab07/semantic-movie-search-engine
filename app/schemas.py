from typing import List, Optional

from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    query: str = Field(..., min_length=1)
    top_n: int = Field(12, ge=1, le=50)


class MovieResult(BaseModel):
    id: Optional[int] = None
    title: str
    overview: Optional[str] = None
    genres: List[str] = []
    release_year: Optional[int] = None
    poster_url: Optional[str] = None
    vote_average: Optional[float] = None
    similarity: Optional[float] = None


class SearchResponse(BaseModel):
    query: str
    results: List[MovieResult]
