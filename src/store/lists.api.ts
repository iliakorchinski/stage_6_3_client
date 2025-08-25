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
    getLists: builder.query<ListsByBoard[], string[]>({
      query: (boardIds) => ({
        url: '/lists',
        method: 'POST',
        body: { boardIds },
      }),
      providesTags: ['Lists'],
    }),
    createList: builder.mutation<List, { boardId: string; title: string }>({
      query: ({ boardId, title }) => ({
        url: `/lists/create`,
        method: 'POST',
        body: { title, boardId },
      }),
      invalidatesTags: ['Lists'],
    }),
    deleteList: builder.mutation<void, string>({
      query: (id) => ({
        url: `lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lists'],
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
      invalidatesTags: ['Lists'],
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
      invalidatesTags: ['Lists'],
    }),
  }),
});

export const {
  useGetListsQuery,
  useUpdateListMutation,
  useCreateListMutation,
  useDeleteListMutation,
  useReorderListsMutation,
} = listsApi;
