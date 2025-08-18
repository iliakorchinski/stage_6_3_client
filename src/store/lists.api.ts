import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../utils/api.utils';

export interface List {
  id: string;
  title: string;
  position: number;
  boardId: string;
  createdAt: string;
  updatedAt: string;
}

export const listsApi = createApi({
  reducerPath: 'listsApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Lists'],
  endpoints: (builder) => ({
    fetchLists: builder.query<List[], string>({
      query: (boardId) => `boards/${boardId}/lists`,
      providesTags: (result, error, boardId) =>
        result
          ? [
              ...result.map((l) => ({ type: 'Lists' as const, id: l.id })),
              { type: 'Lists' as const, id: `BOARD_${boardId}` },
            ]
          : [{ type: 'Lists' as const, id: `BOARD_${boardId}` }],
    }),
    createList: builder.mutation<List, { boardId: string; title: string }>({
      query: ({ boardId, title }) => ({
        url: `boards/${boardId}/lists`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: (result, error, { boardId }) => [
        { type: 'Lists', id: `BOARD_${boardId}` },
      ],
    }),
    deleteList: builder.mutation<void, string>({
      query: (id) => ({
        url: `lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Lists', id }],
    }),
    updateList: builder.mutation<
      List,
      { id: string; title?: string; position?: number }
    >({
      query: ({ id, ...body }) => ({
        url: `lists/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (res, err, arg) => [
        { type: 'Lists', id: arg.id },
        {
          type: 'Lists',
          id: `BOARD_${''}`,
        },
      ],
    }),
    reorderLists: builder.mutation<
      void,
      { boardId: string; listOrder: { id: string; position: number }[] }
    >({
      query: ({ boardId, listOrder }) => ({
        url: `boards/${boardId}/lists/reorder`,
        method: 'POST',
        body: { listOrder },
      }),
      invalidatesTags: (res, err, { boardId }) => [
        { type: 'Lists', id: `BOARD_${boardId}` },
      ],
    }),
  }),
});

export const {
  useFetchListsQuery,
  useUpdateListMutation,
  useCreateListMutation,
  useDeleteListMutation,
  useReorderListsMutation,
} = listsApi;
