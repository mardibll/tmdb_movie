import axios from "axios";
import {
  account_detail,
  create_session,
  favorites_movies,
  movie_details,
  movie_list,
  movie_search,
  remove_from_favorites,
  remove_from_watchlist,
  request_token,
  validate_with_login,
  watchlist_movies,
} from "./apiConfig";
import Api from "./api";

const API_KEY = process.env.REACT_APP_API_KEY || "";

export const getRequestToken = async () => {
  const res = await axios.get(request_token);
  if (res.data.success) {
    localStorage.setItem("request_token", res.data.request_token);
    return res.data;
  }
};

export const validateWithLogin = async (username: string, password: string) => {
  const { request_token } = await getRequestToken();

  const res = await axios.post(validate_with_login, {
    username,
    password,
    request_token: request_token,
  });
  if (res.data.success) {
    localStorage.setItem("valida_token", res.data.request_token);
    const session = await createSession(res.data.request_token);
    localStorage.setItem("session_id", res.data.session_id);

    return session;
  }
};

export const createSession = async (requestToken: string) => {
  const res = await axios.post(create_session, {
    request_token: requestToken,
  });
  getAccountDetails(res.data.session_id);
  return res.data.session_id;
};

export const getAccountDetails = async (session_id: string) => {
  if (!session_id) return;

  try {
    const res = await Api.get(account_detail(session_id));
    const account_id = res.data.id;
    localStorage.setItem("account_id", account_id);

    return res.data;
  } catch (error) {
    console.log("getAccountDetails error:", error);
  }
};

export const getMovieDetails = async (id: number | string) => {
  try {
    const res = await Api.get(movie_details(id));

    return res.data;
  } catch (error) {
    console.log("getMovieDetails error : ", error);
  }
};
export const getMovieSearch = async (query: string) => {
  try {
    const res = await Api.get(movie_search(query));

    return res.data.results;
  } catch (error) {
    console.log("getMovieList error : ", error);
  }
};

export const getMovieList = async (type: string) => {
  try {
    const res = await Api.get(movie_list(type), {});

    return res.data.results;
  } catch (error) {
    console.log("getMovieList error : ", error);
  }
};

export const getFavoriteMovies = async () => {
  const session_id = localStorage.getItem("session_id");
  const account_id = localStorage.getItem("account_id");
  try {
    const res = await Api.get(favorites_movies(account_id, session_id));

    return res.data.results;
  } catch (error) {
    console.log("getFavoriteMovies error : ", error);
  }
};

export const removeFromFavorites = async (
  media_id: number,
  favorite: boolean
) => {
  const session_id = localStorage.getItem("session_id");
  const account_id = localStorage.getItem("account_id");
  try {
    const res = await Api.post(
      remove_from_favorites(account_id, session_id, API_KEY),
      {
        media_type: "movie",
        media_id,
        favorite,
      }
    );

    return res.status;
  } catch (error) {
    console.log("removeFromFavorites error : ", error);
  }
};

export const getWatchlistMovies = async () => {
  const session_id = localStorage.getItem("session_id");
  const account_id = localStorage.getItem("account_id");
  try {
    const res = await Api.get(watchlist_movies(account_id, session_id));

    return res.data.results;
  } catch (error) {
    console.log("getFavoriteMovies error : ", error);
  }
};

export const removeFromWatchlist = async (
  media_id: number,
  watchlist: boolean
) => {
  const session_id = localStorage.getItem("session_id");
  const account_id = localStorage.getItem("account_id");
  try {
    const res = await Api.post(
      remove_from_watchlist(account_id, session_id, API_KEY),
      {
        media_type: "movie",
        media_id,
        watchlist,
      }
    );

    return res.status;
  } catch (error) {
    console.log("removeFromFavorites error : ", error);
  }
};
