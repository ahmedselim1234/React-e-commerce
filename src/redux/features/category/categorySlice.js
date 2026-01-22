import { apiSlice } from "../../app/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //getValunteers
    getCategory: builder.query({
      query: ({ limit = 50, page = 1 } = {}) => {
        return {
          url: `/categories?limit=${limit}&page=${page}`,
          method: "GET",
        };
      },
    }),
    getSubForSpeceficCategory: builder.query({
      query: ({catId}) => {
        return {
          url: `/categories/${catId}/subcategories`,
          method: "GET",
        };
      },
    }),

    //add category
    addCategory: builder.mutation({
      query: ({ name, image }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image[0]);
        return {
          url: `/categories`,
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        };
      },
    }),
  }),
});

export const { useGetCategoryQuery, useAddCategoryMutation,useGetSubForSpeceficCategoryQuery } = categoryApiSlice;
