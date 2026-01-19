import { apiSlice } from "../../app/api/apiSlice";

export const subCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSubcategory: builder.mutation({
      query: ({ name, category }) => {
        return {
          url: `/subcategories`,
          method: "POST",
          body: {
            name,
            category,
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        };
      },
    }),
  }),
});

export const { useAddSubcategoryMutation } = subCategoryApiSlice;
