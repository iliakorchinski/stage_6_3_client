import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../utils/api.utils';
import { type List } from './lists.api';
import { type Task } from './tasks.api';

export type HistoryEntity = Partial<List> | Partial<Task> | Partial<Board>;
export type EntityType = 'Board' | 'List' | 'Task';

export interface History {
  id: string;
  entityType: EntityType;
  entityId: string;
  boardId: string;
  operation: string;
  oldValue?: HistoryEntity;
  newValue?: HistoryEntity;
}

export interface Board {
  id: string;
  title: string;
  position?: number;
  createdAt?: string;
  updatedAt?: string;
  history?: History[];
}

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Boards'],
  endpoints: (builder) => ({
    fetchBoards: builder.query<Board[], { includeHistory?: boolean }>({
      query: ({ includeHistory }) => {
        const params = includeHistory ? '?include=history' : '';
        return `boards${params}`;
      },
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
