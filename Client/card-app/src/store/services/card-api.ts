import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICard } from "../../types/card-type";

const BASE_URL = "http://localhost:5116/api/Card";

export const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCards: builder.query<ICard[], null>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    IncreaseCreditLimit: builder.mutation({
      query: (payload) => ({
        url: "/IncreaseCreditLimit",
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useGetAllCardsQuery, useIncreaseCreditLimitMutation } = cardApi;
