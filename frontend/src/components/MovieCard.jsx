const formatScore = (value) => {
  if (value === null || value === undefined) {
    return "N/A";
  }
  return Number(value).toFixed(2);
};

export default function MovieCard({ movie }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[var(--accent-hover)]">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-12 items-center justify-center overflow-hidden rounded-md border border-[var(--border)] bg-[var(--input)] text-[10px] uppercase text-[var(--muted-soft)]">
          {movie.poster_url ? (
            <img alt={movie.title} src={movie.poster_url} className="h-full w-full object-cover" />
          ) : (
            "Poster"
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[var(--text)]">{movie.title}</h3>
          <p className="text-sm text-[var(--muted)]">
            {movie.release_year ? movie.release_year : "Release year unknown"}
          </p>
        </div>

        <div className="rounded-md border border-[var(--border)] bg-[var(--input)] px-3 py-1 text-xs text-[var(--muted)]">
          Rating {formatScore(movie.vote_average)}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(movie.genres || []).length > 0 ? (
          movie.genres.map((genre) => (
            <span
              key={`${movie.id}-${genre}`}
              className="rounded-md border border-[var(--border)] bg-[var(--input)] px-2.5 py-1 text-xs text-[var(--pill-text)]"
            >
              {genre}
            </span>
          ))
        ) : (
          <span className="rounded-md border border-[var(--border)] bg-[var(--input)] px-2.5 py-1 text-xs text-[var(--pill-text)]">
            Genre not available
          </span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-[var(--muted)]">
        {movie.overview || "Overview unavailable for this title."}
      </p>

      <div className="mt-auto flex items-center justify-between text-xs text-[var(--muted)]">
        <span>Similarity</span>
        <span className="rounded-md border border-[var(--border)] bg-[var(--input)] px-2.5 py-1 text-[var(--text)]">
          {formatScore(movie.similarity)}
        </span>
      </div>
    </article>
  );
}
