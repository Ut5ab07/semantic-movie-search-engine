export default function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-red-400/40 bg-[var(--card)] px-6 py-10 text-center">
      <img
        src="/filmseek-logo.png"
        alt="Confused FilmSeek mascot"
        className="h-20 w-auto object-contain"
      />
      <div className="space-y-2">
        <p className="text-base font-semibold text-red-200">Something went wrong.</p>
        <p className="text-sm text-red-300">Let's try that search again.</p>
        {message && <p className="text-xs text-red-300/80">{message}</p>}
      </div>
    </div>
  );
}
