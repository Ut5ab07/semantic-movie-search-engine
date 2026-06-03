export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-12 text-center">
      <img
        src="/filmseek-logo.png"
        alt="FilmSeek mascot waiting to help"
        className="h-20 w-auto object-contain"
      />
      <div className="space-y-2">
        <p className="text-base font-semibold text-[var(--text)]">I haven't found any movies yet.</p>
        <p className="text-sm text-[var(--muted)]">Tell me what you're looking for!</p>
      </div>
    </div>
  );
}
