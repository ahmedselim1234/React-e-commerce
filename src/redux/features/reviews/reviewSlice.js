import { apiSlice } from "../../app/api/apiSlice";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ reviewData }) => ({
        url: `/reviews`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Reviews", id: "LIST" },
        { type: "Products", id: productId },
      ],
    }),

    // ==================== تحديث تقييم ====================
    updateReview: builder.mutation({
      query: ({ reviewId, reviewData }) => ({
        url: `/reviews/${reviewId}`,
        method: "PUT",
        body: reviewData,
      }),
      invalidatesTags: ({ productId, reviewId }) => [
        { type: "Reviews", id: reviewId },
        { type: "Products", id: productId },
      ],
    }),

    // ==================== حذف تقييم ====================
    deleteReview: builder.mutation({
      query: ({ reviewId }) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [
        "Reviews",
        { type: "Products" },
      ],
    }),

    // ==================== جلب جميع التقييمات لمنتج معين ====================
    getProductReviews: builder.query({
      query: () => ({
        url: `/reviews`,
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: "Reviews", id: _id })),
              { type: "Reviews", id: "LIST" },
            ]
          : [{ type: "Reviews", id: "LIST" }],
    }),

    // ==================== جلب تقييم معين ====================
    getSpecificReview: builder.query({
      query: ({ reviewId }) => ({
        url: `/reviews/${reviewId}`,
        method: "GET",
      }),
      providesTags: ({ reviewId }) => [{ type: "Reviews", id: reviewId }],
    }),
    // ==================== جلب جميع التقييمات (للأدمن) ====================
    getAllReviews: builder.query({
      query: () => ({
        url: `/reviews`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetProductReviewsQuery,
  useGetSpecificReviewQuery,
  useGetAllReviewsQuery,
} = reviewsApiSlice;
