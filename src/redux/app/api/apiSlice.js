import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // ابعت الطلب عادي
  let result = await baseQuery(args, api, extraOptions);

  // لو التوكن انتهى
  if (result?.error?.status === 401) {
    // اطلب توكن جديد
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    // لو نجح
    if (refreshResult?.data?.accessToken) {
      localStorage.setItem("token", refreshResult.data.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      // لو فشل → خروج
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,

  endpoints: () => ({}),
  keepUnusedDataFor: 1800,
});
