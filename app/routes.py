from fastapi import APIRouter, HTTPException

from app.schemas import SearchRequest, SearchResponse
from app.services import search_movies


router = APIRouter()


@router.post("/search", response_model=SearchResponse)
def search_movies_endpoint(payload: SearchRequest) -> SearchResponse:
    try:
        results = search_movies(payload.query, top_n=payload.top_n)
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Search failed. Please try again.") from exc

    return SearchResponse(query=payload.query, results=results)
