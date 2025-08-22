import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../utils/api.utils';
import type { List } from './lists.api';
import type { Task } from './tasks.api';
import type { Board } from './boards.api';

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

export const historyApi = createApi({
  reducerPath: 'historyApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['History'],
  endpoints: (builder) => ({
    getHistoryByBoard: builder.query<History[], string>({
      query: (boardId) => `history/boards/${boardId}`,
      providesTags: ['History'],
    }),
    getHistoryByList: builder.query<History[], string>({
      query: (listId) => `history/lists/${listId}`,
      providesTags: ['History'],
    }),
  }),
});

export const { useGetHistoryByBoardQuery, useGetHistoryByListQuery } =
  historyApi;
