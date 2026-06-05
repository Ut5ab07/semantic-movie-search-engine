import { useRef, useEffect } from "react";

export default function SearchBar({ value, onChange, onSubmit, isLoading }) {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to calculate scrollHeight accurately
    textarea.style.height = "auto";
    
    // Calculate the target height including padding and border
    const scrollHeight = textarea.scrollHeight;
    const borderOffset = 2; // 1px top + 1px bottom border
    
    // Set height to be at least 88px (preferred default for 2 lines), but up to 160px (max height)
    let targetHeight = Math.max(88, scrollHeight + borderOffset);
    targetHeight = Math.min(targetHeight, 160);
    
    textarea.style.height = `${targetHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
    
    window.addEventListener("resize", adjustHeight);
    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, [value]);

  const handleKeyDown = (event) => {
    // If Enter is pressed without Shift, prevent default newline and submit search
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (onSubmit) {
        onSubmit(event);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--search)] p-6"
    >
      <div className="relative flex w-full flex-col rounded-[14px] border border-[var(--border)] bg-[var(--input)] transition-all duration-200 focus-within:border-[var(--accent)]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Try: a hopeful space adventure with heart"
          className="w-full bg-transparent pl-6 pr-24 pt-4 pb-14 text-[20px] font-normal text-[var(--text)] placeholder:text-[16px] placeholder:text-[var(--muted-soft)] focus:outline-none resize-none overflow-y-auto"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-4 bottom-3 flex h-[38px] items-center justify-center rounded-lg border border-transparent bg-[var(--button)] px-5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-[var(--accent)] hover:text-[#0f1419] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}

