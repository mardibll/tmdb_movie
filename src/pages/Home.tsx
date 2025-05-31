import { useState, useEffect } from "react";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { getMovieList } from "../api/apiTmdb";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchPopular = async () => {
      const res = await getMovieList("now_playing");

      setMovies(res);
    };
    fetchPopular();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">TMDB Movie App</h1>
      <SearchBar onResults={setMovies} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} horizontal={false} />
        ))}
      </div>
    </div>
  );
}
