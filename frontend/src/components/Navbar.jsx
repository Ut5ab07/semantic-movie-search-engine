export default function Navbar() {
  return (
    <nav className="w-full border-b border-[var(--border)] bg-[var(--nav)]">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-center px-6">
        <img
          src="/filmseek-logo.png"
          alt="FilmSeek"
          className="h-[100px] sm:h-[144px] w-auto object-contain"
        />
      </div>
    </nav>
  );
}
