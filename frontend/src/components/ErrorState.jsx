export default function ErrorState({ message }) {
  return (
    <div className="rounded-xl border border-red-400/40 bg-[var(--card)] px-6 py-10 text-sm text-red-300">
      {message}
    </div>
  );
}
