import { apiSlice } from "../../app/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== إضافة منتج ====================
    addProduct: builder.mutation({
      query: (productData) => {
        const formData = new FormData();

        // البيانات النصية والأرقام
        formData.append("title", productData.title);
        formData.append("description", productData.description);
        formData.append("quantity", productData.quantity);
        formData.append("price", productData.price);

        if (productData.priceAfterDiscount) {
          formData.append("priceAfterDiscount", productData.priceAfterDiscount);
        }

        // الألوان
        if (productData.colors && productData.colors.length > 0) {
          productData.colors.forEach((color) => {
            formData.append("colors", color);
          });
        }

        // صورة الغلاف
        if (productData.imageCover) {
          formData.append("imageCover", productData.imageCover);
        }

        // الصور الإضافية
        if (
          productData.availableImages &&
          productData.availableImages.length > 0
        ) {
          productData.availableImages.forEach((image) => {
            formData.append("availableImages", image);
          });
        }

        // التصنيف الرئيسي
        if (productData.category) {
          formData.append("category", productData.category);
        }

        // التصنيفات الفرعية
        if (productData.subcategory && productData.subcategory.length > 0) {
          productData.subcategory.forEach((subCat) => {
            formData.append("subcategory", subCat);
          });
        }

        // الماركة
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

    // ==================== جلب المنتجات مع الفلاتر ====================
    getProductsByFilter: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters.page) params.append("page", filters.page);
        if (filters.sort) params.append("sort", filters.sort);
        if (filters.fields) params.append("fields", filters.fields);
        if (filters.limit) params.append("limit", filters.limit);
        if (filters.keyword) params.append("keyword", filters.keyword);
        
        if (filters.category?.length) {
          filters.category.forEach((id) => {
            params.append("category[in][]", id);
          });
        }

    
        if (filters.brand?.length) {
          filters.brand.forEach((id) => {
            params.append("brand[in][]", id);
          });
        }

        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),

    // ==================== أحدث المنتجات ====================
    latestProducts: builder.query({
      query: () => ({
        url: "products/latest-products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // ==================== جلب منتج محدد ====================
    getSpeceficProduct: builder.query({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // ==================== جلب جميع المنتجات ====================
    getAllProducts: builder.query({
      query: () => ({
        url: `products`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // ==================== حذف منتج ====================
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
      // Optimistic Updates
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchAllProducts = dispatch(
          productsApiSlice.util.updateQueryData(
            "getAllProducts",
            undefined,
            (draft) => {
              return draft.data
                ? {
                    ...draft,
                    data: draft.data.filter((item) => item._id !== id),
                  }
                : draft.filter((item) => item._id !== id);
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Delete failed:", error);
          patchAllProducts.undo();
        }
      },
    }),

    // ==================== تحديث منتج ====================
    updateProduct: builder.mutation({
      query: ({ id, productData }) => {
        // إذا كانت productData فعلاً FormData، نستخدمها مباشرة
        if (productData instanceof FormData) {
          return {
            url: `/products/${id}`,
            method: "PUT",
            body: productData,
          };
        }

        // إذا كانت object عادي، نحولها لـ FormData
        const formData = new FormData();

        Object.keys(productData).forEach((key) => {
          const value = productData[key];

          // تخطي القيم الفارغة
          if (value === undefined || value === null || value === "") {
            return;
          }

          // معالجة Arrays
          if (Array.isArray(value)) {
            if (value.length > 0) {
              value.forEach((item) => {
                formData.append(key, item);
              });
            }
          }
          // معالجة Files
          else if (value instanceof File) {
            formData.append(key, value);
          }
          // معالجة القيم العادية
          else {
            formData.append(key, value);
          }
        });

        return {
          url: `/products/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        "Products",
        { type: "Products", id },
      ],
    }),

    //add rating 

    //update rating 

    //delete rating 

    //get all ratings fot specefic product 

    //get specefic rating  for specefic  product 
  }),
});

export const {
  useAddProductMutation,
  useGetProductsByFilterQuery,
  useLatestProductsQuery,
  useGetSpeceficProductQuery,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
