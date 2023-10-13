import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '../constants/apiConst';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    getTasks: build.query({
      query: (isCompleted) =>
        `/todos${isCompleted !== undefined ? `?isCompleted=${isCompleted}` : ''}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks', id })),
              { type: 'Tasks', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Tasks', id: 'PARTIAL-LIST' }],
    }),
    addNewTask: build.mutation({
      query: (body) => ({
        url: `/todos`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'PARTIAL-LIST' }],
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'PARTIAL-LIST' }],
    }),
    updateTask: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'PARTIAL-LIST' }],
    }),
    updateIsCompleted: build.mutation({
      query: (id) => ({
        url: `/todos/${id}/isCompleted`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'PARTIAL-LIST' }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddNewTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useUpdateIsCompletedMutation,
} = tasksApi;
