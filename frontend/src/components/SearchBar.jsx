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
    
    // Determine bounds based on viewport width
    const isMobile = window.innerWidth < 640;
    const minHeight = isMobile ? 80 : 100;
    const maxHeight = isMobile ? 120 : 160;
    
    let targetHeight = Math.max(minHeight, scrollHeight + borderOffset);
    targetHeight = Math.min(targetHeight, maxHeight);
    
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
      className="mx-auto flex w-full flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--search)] p-4 sm:p-6"
    >
      <div className="relative flex w-full flex-col rounded-[14px] border border-[var(--border)] bg-[var(--input)] p-3 sm:p-0 transition-all duration-200 focus-within:border-[var(--accent)]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Try: a hopeful space adventure with heart"
          className="w-full bg-transparent px-3 pb-2 pt-2 text-[20px] font-normal text-[var(--text)] placeholder:text-[16px] placeholder:text-[var(--muted-soft)] focus:outline-none resize-none overflow-y-auto sm:pl-6 sm:pr-24 sm:pt-4 sm:pb-14"
        />
        <div className="w-full sm:absolute sm:right-4 sm:bottom-3 sm:w-auto z-10">
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full h-[48px] items-center justify-center rounded-lg border border-transparent bg-[var(--button)] px-5 text-sm font-semibold text-[var(--button-text)] transition hover:bg-[var(--accent)] hover:text-[#0f1419] disabled:cursor-not-allowed disabled:opacity-60 sm:h-[38px] sm:w-auto"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </form>
  );
}

