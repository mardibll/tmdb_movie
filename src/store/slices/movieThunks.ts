import {
  getFavoriteMovies,
  getMovieDetails,
  getMovieList,
  getMovieSearch,
  removeFromFavorites,
} from "../../api/apiTmdb";
import { AppDispatch } from "../store";
import {
  setFavorite,
  setLoading,
  setMovieDetail,
  setMovies,
  setPopular,
  setTopRating,
} from "./moviesSlice";

export const fetchMoviesList =
  (category: string = "") =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await getMovieList(category);

      switch (category) {
        case "now_playing":
          return dispatch(setMovies(res));
        case "popular":
          return dispatch(setPopular(res));
        case "top_rated":
          return dispatch(setTopRating(res));
        default:
          dispatch(setMovies(res));
          break;
      }
    } catch (error) {
      console.error("fetchMoviesList error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchDetailMovies =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await getMovieDetails(id);

      dispatch(setMovieDetail(res));
    } catch (error) {
      console.error("fetchDetailMovies error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchSearchMovies =
  (query: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await getMovieSearch(query);

      dispatch(setMovies(res));
    } catch (error) {
      console.error("fetchSearchMovies error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchFavoriteMovies = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await getFavoriteMovies();
    dispatch(setFavorite(res));
  } catch (error) {
    console.error("fetchSearchMovies error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};
export const addOrDeleteFavorite =
  (movieId: number, isFavorite: boolean) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      return await removeFromFavorites(movieId, isFavorite);
    } catch (error) {
      console.error("fetchSearchMovies error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
