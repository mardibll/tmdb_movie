import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooksStore";
import { RootState } from "../store/store";
import {
  addOrDeleteWatchlist,
  fetchWatchlistMovies,
} from "../store/slices/movieThunks";
import Loader from "../components/Loader";

const Watchlist: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { watchlist, loading } = useAppSelector(
    (state: RootState) => state.movieStore
  );

  useEffect(() => {
    dispatch(fetchWatchlistMovies());
  }, []);

  const handleRemove = async (movieId: number) => {
    const resultSuccess = await dispatch(addOrDeleteWatchlist(movieId, false));
    if (resultSuccess) dispatch(fetchWatchlistMovies());
  };

  if (loading) return <Loader />;

  if (watchlist.length === 0)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Your watchlist is empty.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Watchlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {watchlist.map((movie) => (
          <div
            key={movie.id}
            className="relative cursor-pointer rounded overflow-hidden shadow hover:shadow-lg transition bg-white"
          >
            <img
              src={process.env.REACT_APP_URL_IMAGE + movie.poster_path}
              alt={movie.title}
              className="w-full h-56 object-cover"
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
            <button
              onClick={() => handleRemove(movie.id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
              aria-label={`Remove ${movie.title} from watchlist`}
              title="Remove from watchlist"
            >
              &times;
            </button>
            <div className="p-2">
              <h3
                className="text-sm font-semibold truncate"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                {movie.title}
              </h3>
              <p className="text-xs text-gray-500">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
