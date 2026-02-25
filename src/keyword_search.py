import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class KeywordSearch:
    def __init__(self, df):
        self.df = df
        self.vectorizer = TfidfVectorizer(stop_words='english', max_features=10000)
        self.tfidf_matrix = self.vectorizer.fit_transform(df['semantic_text'])

    def search(self, query, top_n=5):
        query_vec = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, self.tfidf_matrix)
        top_indices = similarities[0].argsort()[-top_n:][::-1]
        return self.df.iloc[top_indices][['title', 'vote_average']]