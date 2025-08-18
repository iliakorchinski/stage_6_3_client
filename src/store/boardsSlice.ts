import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../utils/api.utils';

export interface Board {
  id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Boards'],
  endpoints: (builder) => ({
    fetchBoards: builder.query<Board[], void>({
      query: () => 'boards',
      providesTags: ['Boards'],
    }),
    createBoard: builder.mutation<Board, { title: string }>({
      query: (data) => ({
        url: 'boards',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Boards'],
    }),
    updateBoard: builder.mutation<Board, Board>({
      query: (board) => ({
        url: `boards/${board.id}`,
        method: 'PUT',
        body: { title: board.title },
      }),
      invalidatesTags: ['Boards'],
    }),
    deleteBoard: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
  }),
});

export const {
  useFetchBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardsApi;
