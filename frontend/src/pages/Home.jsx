import { useState } from "react";

import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import { searchMovies } from "../services/api.js";

const EXAMPLES = [
  { label: "🚀 Space Exploration", value: "Space exploration dramas" },
  { label: "🧠 Psychological Thriller", value: "Psychological thrillers with plot twists" },
  { label: "🎭 Drama", value: "Movies about friendship and adventure" },
  { label: "⚽ Sports", value: "Sports stories about underdogs" },
  { label: "🕵️ Mystery", value: "Mysteries with clever detectives" }
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
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted-soft)]">
                    FilmSeek Semantic Search
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
                    Tell FilmSeek what kind of movie you're looking for.
                  </h1>
                  <p className="mt-4 text-base text-[var(--muted)]">
                    Describe a mood, genre, theme, or story and let the mascot guide you to a match.
                  </p>
                </div>

                <div className="flex items-center justify-center md:justify-end">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-5">
                    <img
                      src="/filmseek-logo.png"
                      alt="FilmSeek mascot with binoculars"
                      className="h-28 w-auto object-contain"
                    />
                    <p className="mt-3 text-center text-xs text-[var(--muted)]">
                      FilmSeek is on the lookout.
                    </p>
                  </div>
                </div>
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
                    key={example.label}
                    type="button"
                    onClick={() => handleExampleClick(example.value)}
                    className="rounded-md border border-[var(--border)] bg-[var(--input)] px-3 py-1 text-[var(--pill-text)] transition hover:border-[var(--accent)] hover:bg-[#2d333b]"
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Movies FilmSeek Found</h2>
            {lastQuery && (
              <p className="text-sm text-[var(--muted)]">You asked for: "{lastQuery}"</p>
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
