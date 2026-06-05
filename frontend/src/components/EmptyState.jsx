export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-8 sm:py-12 text-center">
      <img
        src="/filmseek_empty.png"
        alt="FilmSeek mascot ready to help"
        className="h-28 sm:h-40 w-auto object-contain"
      />
      <div className="space-y-2">
        <p className="text-base font-semibold text-[var(--text)]">
          Ready to discover your next favorite movie?
        </p>
        <p className="text-sm text-[var(--muted)]">
          Describe a genre, theme, mood, actor, or story.
        </p>
      </div>
    </div>
  );
}
