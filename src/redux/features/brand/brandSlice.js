import { apiSlice } from "../../app/api/apiSlice";

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //getValunteers
    getbrand: builder.query({
      query: ({ limit, page }) => {
        return {
          url: `/brands?limit=
          ${limit}&page=${page}`,
          method: "GET",
        };
      },
    }),
    //add category
    addBrand: builder.mutation({
      query: ({ name, image }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image[0]);
        return {
          url: `/brands`,
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

export const { useAddBrandMutation, useGetbrandQuery } = brandApiSlice;
