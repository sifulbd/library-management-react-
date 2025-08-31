import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://library-management-api-xjyd.vercel.app/api",
    }),
    tagTypes: ["Book", "Borrow"],
    endpoints: (builder) => ({
        getBook: builder.query({
            query: (query) => `/books?filter=${query.filter}&skip=${query.skip}&limit=${query.limit}`,
            providesTags: ["Book"],
        }),
        getBookById: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: ["Book"],
        }),
        createBook: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData,
            }),
            invalidatesTags: ["Book"],
        }),
        updateBook: builder.mutation({
            query: (bookData) => ({
                url: `/books/${bookData._id}`,
                method: "PUT",
                body: bookData,
            }),
            invalidatesTags: ["Book"],
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Book"],
        }),
        borrowBook: builder.mutation({
            query: (borrowData) => ({
                url: `/borrow/${borrowData.book}`,
                method: "POST",
                body: borrowData,
            }),
            invalidatesTags: ["Borrow"],
        }),
        getBorrowedBooksSummary: builder.query({
            query: () => `/borrow`,
            providesTags: ["Borrow"],
        }),
    }),
});

export const { useGetBookQuery, useGetBookByIdQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useGetBorrowedBooksSummaryQuery } = baseApi;
