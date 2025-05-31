import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getFavoriteMovies, removeFromFavorites } from "../api/apiTmdb";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const data = await getFavoriteMovies();

      setFavorites(data);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    }
    setLoading(false);
  };

  const handleRemove = async (movieId: number) => {
    await removeFromFavorites(movieId);
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Favorite Movies</h1>

      {favorites?.length === 0 ? (
        <p className="text-gray-500">
          You haven't added any favorite movies yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites?.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow rounded overflow-hidden relative group hover:shadow-lg transition"
            >
              <img
                src={process.env.REACT_APP_URL_IMAGE + movie.poster_path}
                alt={movie.title}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
              <div className="p-2">
                <h2 className="text-sm font-semibold truncate">
                  {movie.title}
                </h2>
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
      )}
    </div>
  );
};

export default Favorites;
