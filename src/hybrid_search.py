from sklearn.metrics.pairwise import cosine_similarity


GENRES = [
    "Action", "Adventure", "Animation", "Comedy", "Crime",
    "Drama", "Family", "Fantasy", "History", "Horror",
    "Music", "Mystery", "Romance", "Science Fiction",
    "Thriller", "War", "Western"
]


class HybridSearch:
    def __init__(self, df, embeddings, model):
        self.df = df
        self.embeddings = embeddings
        self.model = model

    def detect_genres(self, query):
        detected = []
        for genre in GENRES:
            if genre.lower() in query.lower():
                detected.append(genre)
        return detected

    def search(self, query, top_n=5):
        detected_genres = self.detect_genres(query)

        if detected_genres:
            mask = self.df['genres_clean'].astype(str).apply(
                lambda x: any(g in x for g in detected_genres)
            )

            filtered_indices = self.df[mask].index
            filtered_embeddings = self.embeddings[filtered_indices]

            query_embedding = self.model.encode([query])
            similarities = cosine_similarity(query_embedding, filtered_embeddings)

            top_indices = similarities[0].argsort()[-top_n:][::-1]
            selected_indices = filtered_indices[top_indices]

            return self.df.loc[selected_indices][['title', 'vote_average']]

        else:
            query_embedding = self.model.encode([query])
            similarities = cosine_similarity(query_embedding, self.embeddings)

            top_indices = similarities[0].argsort()[-top_n:][::-1]
            return self.df.iloc[top_indices][['title', 'vote_average']]