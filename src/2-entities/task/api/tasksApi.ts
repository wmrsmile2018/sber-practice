import { baseApiRedux } from 'shared/api';
import type { Todo, TTask } from 'entities/task';

function transformResponse(response: Todo[]): TTask[] {
  return response.map((todo) => ({
    id: String(todo.id),
    title: todo.title,
    completed: todo.completed,
    description: undefined,
  }));
}

export const tasksApi = baseApiRedux.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TTask[], void>({
      query: () => '/todos',
      transformResponse: transformResponse,
      providesTags: ['Tasks'],
    }),
  }),
});

export const { useGetTasksQuery } = tasksApi;
