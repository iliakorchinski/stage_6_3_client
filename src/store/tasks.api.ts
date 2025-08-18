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
    fetchTasks: builder.query<Task[], string>({
      query: (listId) => `/lists/${listId}/tasks`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Task' as const, id })),
              { type: 'Task', id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
    }),
    createTask: builder.mutation<
      Task,
      { listId: string; title: string; description?: string }
    >({
      query: ({ listId, title, description }) => ({
        url: `/lists/${listId}/tasks`,
        method: 'POST',
        body: { title, description },
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Task', id }],
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    fetchTasksByBoard: builder.query<Task[], string>({
      query: (boardId) => `/boards/${boardId}/tasks`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Task' as const, id })),
              { type: 'Task', id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
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
      invalidatesTags: (result, error, { taskOrder }) =>
        taskOrder.map((t) => ({ type: 'Task' as const, id: t.id })),
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useMoveTaskMutation,
  useFetchTasksByBoardQuery,
  useReorderTasksMutation,
} = tasksApi;
