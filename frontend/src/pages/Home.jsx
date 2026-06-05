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
      console.error("Search error details:", err);
      if (err.code === "ECONNABORTED") {
        setError("The search request timed out. Please check your connection and try again.");
      } else if (!err.response) {
        setError("The search backend is offline or unreachable. Please check if the server is running.");
      } else if (err.response.status === 404) {
        setError("The search API endpoint was not found on the server.");
      } else if (err.response.status === 500) {
        setError("The server encountered an error processing your query. Please try different terms.");
      } else {
        setError("Something went wrong while searching. Please check your connection and try again.");
      }
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

              <div className="relative mt-6 flex flex-col items-center gap-6">
                <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 w-full max-w-2xl px-4">
                  <img
                    src="/filmseek_search.png"
                    alt="FilmSeek mascot ready to search"
                    className="pointer-events-none h-[85px] sm:h-[150px] lg:h-[190px] w-auto object-contain shrink-0"
                  />
                  <div className="relative w-auto max-w-[190px] sm:max-w-[240px] lg:max-w-[280px] rounded-2xl border border-[var(--accent)]/60 bg-[var(--card)] px-4 py-3 text-xs sm:text-xs lg:text-sm text-[var(--muted)] shadow-[0_12px_30px_rgba(15,20,25,0.35)] shrink-0">
                    <p className="font-semibold text-[var(--text)] text-left">
                      I'm on the lookout for your next favorite movie.
                    </p>
                    <p className="mt-1 text-left">Try a mood, genre, theme, actor, or story description.</p>
                    <span className="absolute left-[-6px] sm:left-[-8px] lg:left-[-10px] top-[40%] -translate-y-1/2 h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3 rounded-full border border-[var(--accent)]/60 bg-[var(--card)]"></span>
                    <span className="absolute left-[-10px] sm:left-[-14px] lg:left-[-18px] top-[40%] -translate-y-1/2 h-1.5 w-1.5 sm:h-2 sm:w-2 lg:h-2.5 lg:w-2.5 rounded-full border border-[var(--accent)]/60 bg-[var(--card)]"></span>
                  </div>
                </div>
                <div className="relative z-30 w-full mt-2 sm:mt-4">
                  <SearchBar
                    value={query}
                    onChange={setQuery}
                    onSubmit={handleSearch}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-[var(--muted)] sm:justify-start sm:gap-4">
                <span className="text-[var(--text)] text-center sm:text-left w-full sm:w-auto">Need inspiration? Try searching for:</span>
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

          {isLoading && <LoadingState message="Searching through thousands of movies..." />}

          {!isLoading && error && <ErrorState message={error} />}

          {!isLoading && !error && results.length === 0 && !lastQuery && <EmptyState />}

          {!isLoading && !error && results.length === 0 && lastQuery && <NoResultsState />}

          {!isLoading && !error && results.length > 0 && <MovieGrid movies={results} />}
        </section>
      </main>
    </div>
  );
}
