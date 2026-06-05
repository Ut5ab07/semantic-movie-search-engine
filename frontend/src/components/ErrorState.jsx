export default function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-red-400/40 bg-[var(--card)] px-6 py-10 text-center">
      <img
        src="/filmseek_error.png"
        alt="FilmSeek mascot confused"
        className="h-40 w-auto object-contain"
      />
      <div className="space-y-2">
        <p className="text-base font-semibold text-red-200">Oops! Something went wrong</p>
        <p className="text-sm text-red-300">Please try again in a moment.</p>
        {message && <p className="text-xs text-red-300/80">{message}</p>}
      </div>
    </div>
  );
}
