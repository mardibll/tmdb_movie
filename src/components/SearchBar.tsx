import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/hooksStore";
import {
  fetchMoviesList,
  fetchSearchMovies,
} from "../store/slices/movieThunks";
import { clearMovies } from "../store/slices/moviesSlice";

type Props = {
  onActionSearchChange?: (status: boolean) => void;
};

export default function SearchBar({ onActionSearchChange }: Props) {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(async () => {
      const isQueryValid = query.trim() !== "";

      if (onActionSearchChange) {
        onActionSearchChange(isQueryValid);
      }

      if (isQueryValid) dispatch(fetchSearchMovies(query));
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const isQueryValid = query.trim() !== "";
    if (onActionSearchChange) {
      onActionSearchChange(isQueryValid);
    }

    if (!isQueryValid) return;

    dispatch(fetchSearchMovies(query));
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value.length <= 0) {
            dispatch(fetchMoviesList("now_playing"));
          } else {
            dispatch(clearMovies());
          }
        }}
        placeholder="Search movies..."
        className="flex-1 p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
