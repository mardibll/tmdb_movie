import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";
import { useAppDispatch, useAppSelector } from "../hooks/hooksStore";
import { RootState } from "../store/store";
import {
  addOrDeleteFavorite,
  fetchDetailMovies,
  fetchFavoriteMovies,
  fetchMoviesList,
} from "../store/slices/movieThunks";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { moviesDetail, popular, favorites, movies, loading } = useAppSelector(
    (state: RootState) => state.movieStore
  );

  useEffect(() => {
    if (id !== undefined) {
      const numericId = parseInt(id);
      dispatch(fetchDetailMovies(numericId));
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    dispatch(fetchMoviesList("popular"));
    dispatch(fetchMoviesList("now_playing"));
  };

  const handleFavorite = async () => {
    if (moviesDetail)
      await dispatch(addOrDeleteFavorite(moviesDetail.id, true));
    dispatch(fetchFavoriteMovies());
  };

  const handleWatchlist = async () => {
    // if (movie) await addToWatchlist(movie.id, true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || !moviesDetail) return <Loader />;

  const isFavorite = favorites.some((x) => x.id === moviesDetail.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={process.env.REACT_APP_URL_IMAGE + moviesDetail.poster_path}
          alt={moviesDetail.title}
          className="w-full md:w-64 rounded shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{moviesDetail.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {moviesDetail.release_date}
          </p>
          <p className="text-gray-700 mb-4">{moviesDetail.overview}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {moviesDetail.genres.map((g, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
              >
                {g.name}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              disabled={isFavorite}
              onClick={handleFavorite}
              className={`px-4 py-2 rounded 
    ${
      isFavorite
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-red-600 text-white hover:bg-red-700"
    }`}
            >
              Add to Favorites
            </button>
            <button
              onClick={handleWatchlist}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">🔥 Popular Movies</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-4">
            {popular.map((movie, index) => (
              <MovieCard key={index} movie={movie} horizontal />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">🆕 New Movies</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-4">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} horizontal />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
