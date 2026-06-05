from pathlib import Path
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer

from src.keyword_search import KeywordSearch
from src.semantic_search import SemanticSearch
from src.hybrid_search import HybridSearch

# Dynamically resolve file paths relative to project root
BASE_DIR = Path(__file__).resolve().parent
PROCESSED_CSV_PATH = BASE_DIR / "data" / "processed" / "movies_semantic.csv"
EMBEDDINGS_PATH = BASE_DIR / "data" / "processed" / "movie_embeddings.npy"

# Loading data
df = pd.read_csv(PROCESSED_CSV_PATH)
df['semantic_text'] = df['semantic_text'].fillna('').astype(str)
df['genres_clean'] = df['genres_clean'].fillna('').astype(str)

# Loading embeddings
embeddings = np.load(EMBEDDINGS_PATH)

# Load model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Initialize systems
keyword = KeywordSearch(df)
semantic = SemanticSearch(df, str(EMBEDDINGS_PATH))
hybrid = HybridSearch(df, embeddings, model)


# Test query
query = "highly motivating boxing story"

print(f"Query:{query}")

print("\nKeyword Search:")
print(keyword.search(query))

print("\nSemantic Search:")
print(semantic.search(query))

print("\nHybrid Search:")
print(hybrid.search(query))