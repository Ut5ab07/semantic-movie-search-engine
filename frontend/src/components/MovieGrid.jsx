import MovieCard from "./MovieCard.jsx";

export default function MovieGrid({ movies }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id ?? movie.title} movie={movie} />
      ))}
    </div>
  );
}
