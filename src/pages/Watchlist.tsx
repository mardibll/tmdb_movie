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
      <h1 className="text-2xl font-bold mb-6">Your Watchlist</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {watchlist?.map((movie, index) => (
          <div
            key={index}
            className="bg-white shadow rounded overflow-hidden relative group hover:shadow-lg transition"
          >
            <img
              src={process.env.REACT_APP_URL_IMAGE + movie.poster_path}
              alt={movie.title}
              className="w-full h-64 object-cover cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
            <div className="p-2">
              <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
              <p className="text-xs text-gray-500">{movie.release_date}</p>
            </div>
            <button
              onClick={() => handleRemove(movie.id)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
