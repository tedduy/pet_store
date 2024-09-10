import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { header } from "framer-motion/client";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://petstore.swagger.io/v2",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: "/user",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: ({username, password}) => ({
        url: `/user/login?username=${username}&password=${password}`,
        method: "GET",
      }),
    }),
  }),
});

export { userApi };
export const { useCreateUserMutation, useLoginUserMutation } = userApi;
