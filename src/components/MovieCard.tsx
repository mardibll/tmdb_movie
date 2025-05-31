import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

interface Props {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
  };
  horizontal?: boolean;
}

const MovieCard = ({ movie, horizontal = false }: Props) => {
  const navigate = useNavigate();

  if (!isLoggedIn()) {
    navigate("/login")
    return null;
  }

  return (
    <div
      className={`cursor-pointer rounded overflow-hidden bg-white shadow hover:shadow-md transition ${
        horizontal ? "min-w-[160px] w-40" : ""
      }`}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={process.env.REACT_APP_URL_IMAGE + movie.poster_path}
        alt={movie.title}
        className="w-full h-60 object-cover"
      />
      <div className="p-2">
        <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
        <p className="text-xs text-gray-500">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
