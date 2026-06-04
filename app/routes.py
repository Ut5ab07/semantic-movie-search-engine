from typing import List
from fastapi import APIRouter, HTTPException, Query

from app.schemas import SearchResponse, MovieResult
from app.services import search_movies, get_movie_by_id, recommend_movies


router = APIRouter()


@router.get("/health")
def health_endpoint() -> dict:
    """Returns the health status of the application."""
    return {"status": "healthy"}


@router.get("/search", response_model=SearchResponse)
def search_movies_endpoint(
    q: str = Query(..., min_length=1, description="Search query string"),
    top_n: int = Query(12, ge=1, le=50, description="Number of results to return")
) -> SearchResponse:
    """Performs semantic movie search based on the provided query."""
    try:
        results = search_movies(q, top_n=top_n)
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Search failed. Please try again.") from exc

    return SearchResponse(query=q, results=results)


@router.get("/movie/{movie_id}", response_model=MovieResult)
def get_movie_endpoint(movie_id: int) -> MovieResult:
    """Retrieves metadata details for a specific movie by ID."""
    movie = get_movie_by_id(movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found.")
    return MovieResult(**movie)


@router.get("/recommend/{movie_id}", response_model=List[MovieResult])
def recommend_movies_endpoint(movie_id: int, limit: int = Query(5, ge=1, le=20)) -> List[MovieResult]:
    """Retrieves semantic movie recommendations based on a movie's content."""
    movie = get_movie_by_id(movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found.")
    
    try:
        results = recommend_movies(movie_id, top_n=limit)
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Recommendation generation failed.") from exc

    return [MovieResult(**r) for r in results]
