export default function SearchBar({ value, onChange, onSubmit, isLoading }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full flex-col gap-5 rounded-xl border border-[var(--border)] bg-[var(--search)] p-6 md:flex-row md:items-center"
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Try: space exploration dramas with hope"
        className="h-[56px] w-full flex-1 rounded-[14px] border border-[var(--border)] bg-[var(--input)] px-6 text-[20px] font-normal text-[var(--text)] placeholder:text-[16px] placeholder:text-[var(--muted-soft)] focus:outline-none focus:border-[var(--accent)] sm:h-[60px] lg:h-[68px]"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="flex h-[38px] items-center justify-center rounded-lg border border-transparent bg-[var(--button)] px-5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-[var(--button-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
