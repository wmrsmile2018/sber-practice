import type { TTask } from 'entities/task';
import type { Filter } from './types';
import { useCallback, useState } from 'react';

type UseTasks = (initial: TTask[]) => {
  tasks: TTask[]; // отфильтрованные задачи
  filter: Filter; // текущий фильтр
  setFilter: (f: Filter) => void; // смена фильтра
  removeTask: (id: string) => void; // удаление задачи по ID
  updateStatus: (id: string, status: boolean) => void;
};

export const useTasks: UseTasks = (initial) => {
  const [filter, setFilter] = useState<Filter>('all');
  const [tasks, setTasks] = useState<TTask[]>(initial);

  const updateFilter = useCallback((f: Filter) => {
    setFilter(f);
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => {
      return prev.filter((task) => task.id !== id);
    });
  }, []);

  const updateStatus = useCallback((id: string, status: boolean) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: status } : item
      )
    );
  }, []);

  return {
    tasks,
    filter,
    setFilter: updateFilter,
    removeTask,
    updateStatus,
  };
};
