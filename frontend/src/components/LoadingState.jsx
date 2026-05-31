export default function LoadingState() {
  return (
    <div className="flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] py-16">
      <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]"></div>
        Searching...
      </div>
    </div>
  );
}
