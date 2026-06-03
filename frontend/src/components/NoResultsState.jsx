export default function NoResultsState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-12 text-center">
      <img
        src="/filmseek_noresult.png"
        alt="FilmSeek mascot with no matches"
        className="h-40 w-auto object-contain"
      />
      <div className="space-y-2">
        <p className="text-base font-semibold text-[var(--text)]">No matching movies found</p>
        <p className="text-sm text-[var(--muted)]">Try describing the movie differently.</p>
      </div>
    </div>
  );
}
