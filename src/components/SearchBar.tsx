import { useState } from "react";
import { Movie } from "../types/movie";
import { getMovieSearch } from "../api/apiTmdb";

type Props = {
  onResults: (movies: Movie[]) => void;
};

export default function SearchBar({ onResults }: Props) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await getMovieSearch(query);

    onResults(res);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
