import { useState } from "react";

import Navbar from "../components/Navbar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import NoResultsState from "../components/NoResultsState.jsx";
import { searchMovies } from "../services/api.js";

const EXAMPLES = [
  "Movies about heartbreak and moving on",
  "Space adventures with hope and survival",
  "Psychological thrillers with unexpected twists",
  "Inspiring underdog sports stories",
  "Mystery movies that keep you guessing"
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
          <div className="relative overflow-visible rounded-xl border border-[var(--border)] bg-[var(--search)] px-6 py-8 md:px-10 md:pb-16">
            <div className="flex flex-col gap-8">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted-soft)]">
                  FilmSeek Semantic Search
                </p>
                <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
                  Describe a movie in your own words.
                </h1>
                <p className="mt-4 text-base text-[var(--muted)]">
                  Share a mood, genre, or story idea, and FilmSeek will track down the best fits.
                </p>
              </div>

              <div className="relative mt-6 pt-24 md:pt-28">
                <img
                  src="/filmseek_search.png"
                  alt="FilmSeek mascot ready to search"
                  className="pointer-events-none absolute left-1/2 -top-10 z-20 h-[240px] w-auto -translate-x-1/2 object-contain sm:h-[260px] md:h-[300px]"
                />
                <div className="pointer-events-none absolute left-1/2 -top-10 z-30 w-[220px] translate-x-[30%] rounded-3xl border border-[var(--accent)]/60 bg-[var(--card)] px-4 py-3 text-xs text-[var(--muted)] shadow-[0_12px_30px_rgba(15,20,25,0.35)] sm:w-[240px]">
                  <p className="font-semibold text-[var(--text)]">
                    I'm on the lookout for your next favorite movie.
                  </p>
                  <p className="mt-2">Try a mood, genre, theme, actor, or story description.</p>
                  <span className="absolute -left-4 bottom-3 h-3 w-3 rounded-full border border-[var(--accent)]/60 bg-[var(--card)]"></span>
                  <span className="absolute -left-6 bottom-1 h-2 w-2 rounded-full border border-[var(--accent)]/60 bg-[var(--card)]"></span>
                </div>
                <div className="relative z-30">
                  <SearchBar
                    value={query}
                    onChange={setQuery}
                    onSubmit={handleSearch}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
                <span className="text-[var(--text)]">Need inspiration? Try searching for:</span>
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
          {results.length > 0 && !isLoading && !error && (
            <div className="flex items-center gap-4 md:gap-6">
              <img
                src="/filmseek_successSearch.png"
                alt="FilmSeek mascot"
                className="h-24 w-auto sm:h-36 md:h-48 object-contain"
              />
              <div className="flex flex-col gap-1 md:gap-2">
                <h2 className="text-xl font-bold md:text-2xl text-[var(--text)]"> FilmSeek Found Some Matches</h2>
                {lastQuery && (
                  <p className="text-sm md:text-base text-[var(--muted)]">
                    You asked for: <span className="text-[var(--text)] font-medium">"{lastQuery}"</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {isLoading && <LoadingState />}

          {!isLoading && error && <ErrorState message={error} />}

          {!isLoading && !error && results.length === 0 && !lastQuery && <EmptyState />}

          {!isLoading && !error && results.length === 0 && lastQuery && <NoResultsState />}

          {!isLoading && !error && results.length > 0 && <MovieGrid movies={results} />}
        </section>
      </main>
    </div>
  );
}
