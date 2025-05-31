import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieList } from "../api/apiTmdb";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const details = await getMovieDetails(Number(id));

      const popular = await getMovieList("popular");
      const now = await getMovieList("now_playing");

      setMovie(details);
      setPopularMovies(popular);
      setNowPlaying(now);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    // if (movie) await addToFavorites(movie.id, true);
  };

  const handleWatchlist = async () => {
    // if (movie) await addToWatchlist(movie.id, true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || !movie) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={process.env.REACT_APP_URL_IMAGE + movie.poster_path}
          alt={movie.title}
          className="w-full md:w-64 rounded shadow"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-500 mb-4">{movie.release_date}</p>
          <p className="text-gray-700 mb-4">{movie.overview}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
              >
                {g.name}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleFavorite}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} horizontal />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">🆕 New Movies</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-4">
            {nowPlaying.map((movie) => (
              <MovieCard key={movie.id} movie={movie} horizontal />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
