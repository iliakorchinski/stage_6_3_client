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

interface ListsByBoard {
  boardId: string;
  lists: List[];
}

export const listsApi = createApi({
  reducerPath: 'listsApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Lists'],
  endpoints: (builder) => ({
    fetchLists: builder.query<ListsByBoard[], string[]>({
      query: (boardIds) => ({
        url: '/lists',
        method: 'POST',
        body: { boardIds },
      }),
      providesTags: (result, error, boardIds) =>
        result
          ? [
              ...result.map(({ boardId }) => ({
                type: 'Lists' as const,
                id: `BOARD_${boardId}`,
              })),
              ...result.flatMap(({ lists }) =>
                lists.map((l) => ({ type: 'Lists' as const, id: l.id }))
              ),
            ]
          : boardIds.map((id) => ({
              type: 'Lists' as const,
              id: `BOARD_${id}`,
            })),
    }),
    createList: builder.mutation<List, { boardId: string; title: string }>({
      query: ({ boardId, title }) => ({
        url: `/lists/create`,
        method: 'POST',
        body: { title, boardId },
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
      invalidatesTags: (result) => [
        { type: 'Lists', id: `BOARD_${result?.boardId || 'UNKNOWN'}` },
      ],
    }),
    reorderLists: builder.mutation<
      void,
      { boardId: string; listOrder: { id: string; position: number }[] }
    >({
      query: ({ boardId, listOrder }) => ({
        url: `/lists/reorder`,
        method: 'POST',
        body: { listOrder, boardId },
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
