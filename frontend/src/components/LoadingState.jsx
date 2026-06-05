export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] py-12">
      <img
        src="/filmseek_searching.png"
        alt="FilmSeek mascot searching"
        className="h-40 w-auto object-contain"
      />
      <p className="text-sm text-[var(--muted)]">Searching through thousands of movies...</p>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]"></div>
    </div>
  );
}
