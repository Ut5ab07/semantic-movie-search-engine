import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.routes import router
from app.services import init_services

# Initialize dotenv configuration
load_dotenv()

# Setup system logging format
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger("semantic_search_api")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up Semantic Movie Search API...")
    try:
        init_services()
        logger.info("Application startup completed successfully.")
    except Exception as exc:
        logger.critical(f"Failed to initialize services during startup: {exc}", exc_info=True)
        raise exc
    yield
    logger.info("Shutting down Semantic Movie Search API...")


app = FastAPI(title="Semantic Movie Search API", lifespan=lifespan)

# Read ALLOWED_ORIGINS from environment, splitting by comma
env_origins = os.getenv("ALLOWED_ORIGINS", "")
allowed_origins = [origin.strip() for origin in env_origins.split(",") if origin.strip()]

# Default fallback for development if none configured or environment is set to development
if not allowed_origins or os.getenv("ENVIRONMENT") == "development":
    allowed_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ]

logger.info(f"CORS origins configured: {allowed_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def read_root() -> dict:
    return {"status": "ok"}

