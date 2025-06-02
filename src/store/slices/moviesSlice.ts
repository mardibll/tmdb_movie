import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieDetailData } from "../../types/movie";

export interface FILTER {
  category: string;
  page: number;
}
export interface MoviesState {
  movies: Movie[];
  popular: Movie[];
  topRating: Movie[];
  favorites: Movie[];
  moviesDetail: MovieDetailData | null;
  searchQuery: string;
  filter: FILTER;
  loading: boolean;
}

const initialState: MoviesState = {
  movies: [],
  popular: [],
  topRating: [],
  favorites: [],
  moviesDetail: null,
  searchQuery: "",
  filter: {
    category: "",
    page: 1,
  },
  loading: false,
};

const moviesSlice = createSlice({
  name: "movieStore",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = [...state.movies, ...action.payload];
    },
    setMovieDetail(state, action: PayloadAction<MovieDetailData>) {
      state.moviesDetail = action.payload;
    },
    setPopular(state, action: PayloadAction<Movie[]>) {
      state.popular = [...state.popular, ...action.payload];
    },
    setTopRating(state, action: PayloadAction<Movie[]>) {
      state.topRating = [...state.topRating, ...action.payload];
    },
    setSearched(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearMovies(state) {
      state.movies = [];
    },

    setFavorite(state, action: PayloadAction<Movie[]>) {
      state.favorites = [...state.favorites, ...action.payload];
    },
  },
});

export const {
  setMovies,
  setPopular,
  setTopRating,
  setLoading,
  setMovieDetail,
  setSearched,
  clearMovies,
  setFavorite,
} = moviesSlice.actions;

export default moviesSlice.reducer;
