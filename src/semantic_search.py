import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class SemanticSearch:
    def __init__(self, df, embeddings_path):
        self.df = df
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.embeddings = np.load(embeddings_path)

    def search(self, query, top_n=5):
        query_embedding = self.model.encode([query])
        similarities = cosine_similarity(query_embedding, self.embeddings)
        top_indices = similarities[0].argsort()[-top_n:][::-1]
        return self.df.iloc[top_indices][['title', 'vote_average']]