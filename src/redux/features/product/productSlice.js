import { apiSlice } from "../../app/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productData) => {
        const formData = new FormData();

        // إضافة البيانات النصية
        formData.append("title", productData.title);
        formData.append("description", productData.description);
        formData.append("quantity", productData.quantity);
        formData.append("price", productData.price);

        // إضافة السعر بعد الخصم إذا كان موجوداً
        if (productData.priceAfterDiscount) {
          formData.append("priceAfterDiscount", productData.priceAfterDiscount);
        }

        // إضافة الألوان
        productData.colors.forEach((color) => {
          formData.append("colors", color);
        });

        // إضافة صورة الغلاف
        if (productData.imageCover) {
          formData.append("imageCover", productData.imageCover);
        }

        // إضافة الصور الإضافية
        if (
          productData.availableImages &&
          productData.availableImages.length > 0
        ) {
          productData.availableImages.forEach((image) => {
            formData.append("availableImages", image);
          });
        }

        // إضافة التصنيف الرئيسي
        if (productData.category) {
          formData.append("category", productData.category);
        }

        // إضافة التصنيفات الفرعية
        if (productData.subcategory && productData.subcategory.length > 0) {
          productData.subcategory.forEach((subCat) => {
            formData.append("subcategory", subCat);
          });
        }

        // إضافة الماركة
        if (productData.brand) {
          formData.append("brand", productData.brand);
        }

        return {
          url: `/products`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Products"],
    }),

    
    getProductsByFilter: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters.page) params.append("page", filters.page);
        if (filters.sort) params.append("sort", filters.sort);
        if (filters.fields) params.append("fields", filters.fields);
        if (filters.limit) params.append("limit", filters.limit);
        if (filters.keyword) params.append("keyword", filters.keyword);
        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),
  }),
});

export const { useAddProductMutation ,useGetProductsByFilterQuery} = productsApiSlice;
