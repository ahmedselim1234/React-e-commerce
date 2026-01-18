import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";


const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  // credentials: "include",
  
  prepareHeaders: (headers) => {
    // const token = Cookies.get("accessToken");
    const token =  import.meta.env.VITE_TOKEN
    console.log(token);
    
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});


