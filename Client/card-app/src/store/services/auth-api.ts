import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


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
      async onQueryStarted(payload, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.token);
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
