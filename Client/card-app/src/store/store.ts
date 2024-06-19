import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth-api";
import { cardApi } from "./services/card-api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [cardApi.reducerPath]: cardApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, cardApi.middleware]),
});
