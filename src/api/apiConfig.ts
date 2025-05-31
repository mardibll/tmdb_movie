const API_KEY = process.env.REACT_APP_API_KEY;

const request_token = `authentication/token/new?api_key=${API_KEY}`;
const validate_with_login = `authentication/token/validate_with_login?api_key=${API_KEY}`;
const create_session = `authentication/session/new?api_key=${API_KEY}`;

const remove_from_favorites = (
  account_id: string | null,
  session_id: string | null
) => `account/${account_id}/favorite?session_id=${session_id}`;

const favorites_movies = (
  account_id: string | null,
  session_id: string | null
) => `account/${account_id}/favorite/movies?session_id=${session_id}`;

const movie_details = (id: number) => `movie/${id}`;
const movie_list = (type: string) => `movie/${type}?language=en-US&page=1`;
const movie_search = (query: string) => `search/movie?query=${query}`;

export {
  request_token,
  validate_with_login,
  create_session,
  remove_from_favorites,
  movie_details,
  movie_list,
  favorites_movies,
  movie_search
};
