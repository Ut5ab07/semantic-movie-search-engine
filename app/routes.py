import logging
import time
from typing import List
from fastapi import APIRouter, HTTPException, Query

from app.schemas import SearchResponse, MovieResult
from app.services import search_movies, get_movie_by_id, recommend_movies

# Configure route-specific logger
logger = logging.getLogger("semantic_search_api.routes")

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
    logger.info(f"Search request: query='{q}', top_n={top_n}")
    start_time = time.time()
    try:
        results = search_movies(q, top_n=top_n)
        duration = time.time() - start_time
        logger.info(f"Search query success: query='{q}' returned {len(results)} matches in {duration:.4f}s")
        return SearchResponse(query=q, results=results)
    except Exception as exc:
        logger.error(f"Internal error for query='{q}': {exc}", exc_info=True)
        raise HTTPException(status_code=500, detail="Search failed. Please try again.") from exc


@router.get("/movie/{movie_id}", response_model=MovieResult)
def get_movie_endpoint(movie_id: int) -> MovieResult:
    """Retrieves metadata details for a specific movie by ID."""
    logger.info(f"Details request: movie_id={movie_id}")
    try:
        movie = get_movie_by_id(movie_id)
        if not movie:
            logger.warning(f"Movie detail lookup failed: movie_id={movie_id} not found")
            raise HTTPException(status_code=404, detail="Movie not found.")
        return MovieResult(**movie)
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Internal error looking up movie_id={movie_id}: {exc}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to retrieve movie details.") from exc


@router.get("/recommend/{movie_id}", response_model=List[MovieResult])
def recommend_movies_endpoint(movie_id: int, limit: int = Query(5, ge=1, le=20)) -> List[MovieResult]:
    """Retrieves semantic movie recommendations based on a movie's content."""
    logger.info(f"Recommendations request: movie_id={movie_id}, limit={limit}")
    try:
        movie = get_movie_by_id(movie_id)
        if not movie:
            logger.warning(f"Recommendation generation aborted: source movie_id={movie_id} not found")
            raise HTTPException(status_code=404, detail="Movie not found.")
        
        results = recommend_movies(movie_id, top_n=limit)
        logger.info(f"Recommendations success: generated {len(results)} items for movie_id={movie_id}")
        return [MovieResult(**r) for r in results]
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Internal error generating recommendations for movie_id={movie_id}: {exc}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to generate recommendations.") from exc

