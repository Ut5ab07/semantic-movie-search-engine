import os
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv

# Load env variables in case imported independently
load_dotenv()


class SemanticSearch:
    def __init__(self, df, embeddings_path):
        self.df = df
        # Retrieve the embedding model from environment variables, fallback to all-MiniLM-L6-v2
        model_name = os.getenv("MODEL_NAME", "all-MiniLM-L6-v2")
        self.model = SentenceTransformer(model_name)
        self.embeddings = np.load(embeddings_path)

    def search(self, query, top_n=5):
        query_embedding = self.model.encode([query])
        similarities = cosine_similarity(query_embedding, self.embeddings)
        top_indices = similarities[0].argsort()[-top_n:][::-1]
        return self.df.iloc[top_indices][['title', 'vote_average']]