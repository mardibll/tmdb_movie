import { configureStore, Middleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import moviesReducer from "./slices/moviesSlice";

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    movieStore: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
