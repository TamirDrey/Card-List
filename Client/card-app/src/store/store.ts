import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth-api";
import { cardApi } from "./services/card-api";
import authReducer from "./redusers/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [cardApi.reducerPath]: cardApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, cardApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
