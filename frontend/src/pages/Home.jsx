import { useState } from "react";

import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { searchMovies } from "../services/api.js";

const EXAMPLES = [
  "Movies about friendship and adventure",
  "Psychological thrillers with plot twists",
  "Space exploration dramas"
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const sanitized = query.trim();
      const data = await searchMovies(sanitized);
      setResults(data.results || []);
      setLastQuery(sanitized);
    } catch (err) {
      setError("Something went wrong while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example) => {
    setQuery(example);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-8">
        <section className="flex flex-col gap-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--search)] px-6 py-8 md:px-10">
            <div className="flex flex-col gap-8">
              <div className="max-w-2xl">
                <h1 className="text-3xl font-semibold md:text-4xl">Semantic Movie Search</h1>
                <p className="mt-4 text-base text-[var(--muted)]">
                  Search movies using natural language. Results are powered by the existing
                  semantic engine.
                </p>
              </div>

              <SearchBar
                value={query}
                onChange={setQuery}
                onSubmit={handleSearch}
                isLoading={isLoading}
              />

              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
                <span className="text-[var(--text)]">Example searches:</span>
                {EXAMPLES.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => handleExampleClick(example)}
                    className="rounded-md border border-[var(--border)] bg-[var(--input)] px-3 py-1 text-[var(--pill-text)] transition hover:border-[var(--accent)] hover:bg-[#2d333b]"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Results</h2>
            {lastQuery && (
              <p className="text-sm text-[var(--muted)]">Search: "{lastQuery}"</p>
            )}
          </div>

          {isLoading && <LoadingState />}

          {!isLoading && error && <ErrorState message={error} />}

          {!isLoading && !error && results.length === 0 && <EmptyState />}

          {!isLoading && !error && results.length > 0 && <MovieGrid movies={results} />}
        </section>
      </main>
    </div>
  );
}
