import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://petstore.swagger.io/v2' }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (user) => ({
                url: "/user",
                method: 'POST',
                body: user
            })
        })
    })
});

export { userApi };
export const { useCreateUserMutation } = userApi;
