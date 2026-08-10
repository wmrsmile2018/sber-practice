import type { TTask } from 'entities/task';
import type { Filter, Priority } from './types';
import { useCallback, useMemo, useState } from 'react';

type UseTasks = (initial: TTask[]) => {
  tasks: TTask[]; // отфильтрованные задачи
  filter: Filter; // текущий фильтр
  setFilter: (f: Filter) => void; // смена фильтра
  setPriority: (p: Priority) => void; // смена фильтра
  removeTask: (id: string) => void; // удаление задачи по ID
  updateStatus: (id: string, status: boolean) => void;
};

export const useTasks: UseTasks = (initial) => {
  const [filter, setFilter] = useState<Filter>('all');
  const [priority, setPriority] = useState<Priority>('all');
  const [tasks, setTasks] = useState<TTask[]>(initial);

  const updateFilter = useCallback((f: Filter) => {
    setFilter(f);
  }, []);
  const updatePriority = useCallback((priority: Priority) => {
    setPriority(priority);
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

  const filteredTasks = useMemo(() => {
    const res =
      priority === 'all'
        ? tasks
        : tasks.filter((task) => task.priority === priority);

    return filter === 'all'
      ? res
      : filter === 'completed'
        ? res.filter((task) => task.completed)
        : res.filter((task) => !task.completed);
  }, [priority, tasks, filter]);

  return {
    tasks: filteredTasks,
    filter,
    setFilter: updateFilter,
    setPriority: updatePriority,
    removeTask,
    updateStatus,
  };
};
