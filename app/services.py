import json
from pathlib import Path
from typing import Any, Dict, List

import pandas as pd

from src.semantic_search import SemanticSearch


BASE_DIR = Path(__file__).resolve().parent.parent
PROCESSED_PATH = BASE_DIR / "data" / "processed" / "movies_semantic.csv"
RAW_PATH = BASE_DIR / "data" / "raw" / "tmdb_5000_movies.csv"
EMBEDDINGS_PATH = BASE_DIR / "data" / "processed" / "movie_embeddings.npy"

_processed_df = None
_raw_meta = None
_searcher = None


def _load_processed() -> pd.DataFrame:
    global _processed_df
    if _processed_df is None:
        df = pd.read_csv(PROCESSED_PATH)
        df["semantic_text"] = df["semantic_text"].fillna("").astype(str)
        df["genres_clean"] = df["genres_clean"].fillna("").astype(str)
        _processed_df = df
    return _processed_df


def _load_raw_meta() -> Dict[int, Dict[str, Any]]:
    global _raw_meta
    if _raw_meta is None:
        try:
            raw = pd.read_csv(
                RAW_PATH,
                usecols=["id", "overview", "release_date", "genres", "title", "vote_average"],
            )
        except Exception:
            _raw_meta = {}
            return _raw_meta

        raw["overview"] = raw["overview"].fillna("").astype(str)
        raw["release_date"] = raw["release_date"].fillna("").astype(str)
        raw["genres"] = raw["genres"].fillna("").astype(str)
        _raw_meta = raw.set_index("id").to_dict(orient="index")
    return _raw_meta


def _get_searcher() -> SemanticSearch:
    global _searcher
    if _searcher is None:
        df = _load_processed()
        _searcher = SemanticSearch(df, str(EMBEDDINGS_PATH))
    return _searcher


def _parse_overview(semantic_text: str) -> str:
    if not semantic_text:
        return ""
    if "Overview:" in semantic_text:
        return semantic_text.split("Overview:", 1)[1].strip().rstrip(".")
    return semantic_text[:280].strip()


def _parse_release_year(date_str: str) -> int | None:
    if not date_str:
        return None
    if len(date_str) >= 4 and date_str[:4].isdigit():
        return int(date_str[:4])
    return None


def _parse_genres(raw_genres: str, fallback: str) -> List[str]:
    if raw_genres:
        try:
            items = json.loads(raw_genres)
            names = [item.get("name", "").strip() for item in items if isinstance(item, dict)]
            names = [name for name in names if name]
            if names:
                return names
        except Exception:
            pass
    if fallback:
        return [genre for genre in fallback.split() if genre]
    return []


def search_movies(query: str, top_n: int = 12) -> List[Dict[str, Any]]:
    searcher = _get_searcher()
    processed = _load_processed()
    raw_meta = _load_raw_meta()

    results_df = searcher.search(query, top_n=top_n)
    merged = results_df.merge(
        processed[["id", "title", "vote_average", "genres_clean", "semantic_text"]],
        on=["title", "vote_average"],
        how="left",
    ).drop_duplicates(subset=["id", "title", "vote_average"])

    results: List[Dict[str, Any]] = []
    for _, row in merged.iterrows():
        movie_id = row.get("id")
        meta = raw_meta.get(int(movie_id)) if pd.notna(movie_id) else {}
        overview = meta.get("overview") or _parse_overview(row.get("semantic_text", ""))
        release_year = _parse_release_year(meta.get("release_date", ""))
        genres = _parse_genres(meta.get("genres", ""), row.get("genres_clean", ""))

        results.append(
            {
                "id": int(movie_id) if pd.notna(movie_id) else None,
                "title": row.get("title", ""),
                "overview": overview,
                "genres": genres,
                "release_year": release_year,
                "poster_url": None,
                "vote_average": float(row.get("vote_average")) if pd.notna(row.get("vote_average")) else None,
                "similarity": None,  # TODO: compute similarity using SemanticSearch embeddings if needed.
            }
        )

    return results
