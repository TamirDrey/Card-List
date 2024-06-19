import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../redusers/authReducer";

const BASE_URL = "http://localhost:5116/api/User";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            localStorage.setItem("accessToken", data.token);
            dispatch(setUser());
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    authMe: builder.query({
      query: () => ({
        url: "/auth-me",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            dispatch(setUser());
          }
        } catch (error) {
          console.error(error);
          localStorage.removeItem("accessToken");
        }
      },
    }),
  }),
});

export const { useLoginMutation, useAuthMeQuery } = authApi;
