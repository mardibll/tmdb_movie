import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { useAppDispatch, useAppSelector } from "../hooks/hooksStore";
import { RootState } from "../store/store";
import { fetchMoviesList } from "../store/slices/movieThunks";

export default function Home() {
  const dispatch = useAppDispatch();
  const { topRating, movies } = useAppSelector(
    (state: RootState) => state.movieStore
  );
  const [actionSearch, setActionSearch] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(fetchMoviesList("now_playing"));
    dispatch(fetchMoviesList("top_rated"));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">TMDB MOVIES</h1>
      <SearchBar onActionSearchChange={setActionSearch} />
      {actionSearch && movies.length === 0 && (
        <h1 className="text-2xl  mb-4">"keywords do not match"</h1>
      )}
      <div>
        <h1 className="text-3xl font-bold mb-4">
          {actionSearch ? "" : "Now Playing"}
        </h1>
        <div
          className={`${
            actionSearch
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              : "flex gap-4 overflow-x-auto whitespace-nowrap py-1"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              horizontal={actionSearch ? false : true}
            />
          ))}
        </div>
      </div>
      {topRating.length > 0 && !actionSearch && (
        <div>
          <h1 className="text-3xl font-bold my-4">Top Rated</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {topRating.map((movie) => (
              <MovieCard key={movie.id} movie={movie} horizontal={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
