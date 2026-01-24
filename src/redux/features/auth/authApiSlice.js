import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credintails) => ({
        url: "auth/login",
        method: "POST",
        body: { ...credintails },
      }),
    }),

    signup: builder.mutation({
      query: (credintails) => ({
        url: "auth/signup",
        method: "POST",
        body: { ...credintails },
      }),
    }),
    forgetPassword: builder.mutation({
      query: (credintails) => ({
        url: "auth/forgetpassword",
        method: "POST",
        body: { ...credintails },
      }),
    }),
    verifyCode: builder.mutation({
      query: (credintails) => ({
        url: "auth/verifyResetCode",
        method: "POST",
        body: { ...credintails },
      }),
    }),

    resetPassword: builder.mutation({
      query: (credintails) => ({
        url: "auth/addnewpassword",
        method: "PUT",
        body: { ...credintails },
      }),
    }),



  }),
});

export const { useLoginMutation, useLogoutMutation, useSignupMutation,useForgetPasswordMutation,useVerifyCodeMutation ,useResetPasswordMutation} =
  authApiSlice;
