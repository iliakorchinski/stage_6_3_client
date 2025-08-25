import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../utils/api.utils';

export interface Task {
  id: string;
  title: string;
  description?: string;
  listId: string;
  position: number;
}

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    createTask: builder.mutation<
      Task,
      { listId: string; title: string; description?: string }
    >({
      query: ({ listId, title, description }) => ({
        url: `/tasks/create`,
        method: 'POST',
        body: { title, description, listId },
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<
      Task,
      { id: string; title?: string; description?: string }
    >({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    moveTask: builder.mutation<
      Task,
      { id: string; listId: string; position: number }
    >({
      query: ({ id, listId, position }) => ({
        url: `/tasks/${id}/move`,
        method: 'PATCH',
        body: { listId, position },
      }),
      invalidatesTags: ['Task'],
    }),
    getTasksByBoard: builder.query<Task[], string>({
      query: (boardId) => ({
        url: '/tasks',
        method: 'POST',
        body: { boardId },
      }),
      providesTags: ['Task'],
    }),
    reorderTasks: builder.mutation<
      Task[],
      { taskOrder: { id: string; listId: string }[] }
    >({
      query: ({ taskOrder }) => ({
        url: `/tasks/reorder`,
        method: 'POST',
        body: { taskOrder },
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useMoveTaskMutation,
  useGetTasksByBoardQuery,
  useReorderTasksMutation,
} = tasksApi;
