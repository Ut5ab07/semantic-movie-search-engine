export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] py-12">
      <img
        src="/filmseek-logo.png"
        alt="FilmSeek mascot scanning with binoculars"
        className="h-20 w-auto object-contain"
      />
      <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]"></div>
        Searching through thousands of movies...
      </div>
    </div>
  );
}
