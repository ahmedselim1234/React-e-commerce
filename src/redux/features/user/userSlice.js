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
    getUserWishList: builder.query({
      query: ({limit,page}) => {
        return {
          url: `wishList?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
    }),

    updatePassword: builder.mutation({
      query: (data) => {
        return {
          url: `users/changeMyPassword`,
          method: "PUT",
          body:data
        };
      },
    }),




  }),
});

export const { useGetUserQuery,useUpdatePasswordMutation,useGetUserWishListQuery } = userApiSlice;
