import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({

      query: () => {
        return {
          url: `users/getme`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {  useGetUserQuery} = userApiSlice;
