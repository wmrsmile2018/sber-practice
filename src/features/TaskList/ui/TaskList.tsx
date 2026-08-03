import { TaskCard, type TTask } from 'entities/task';
import { memo, useCallback, useMemo, useState, type FC } from 'react';
import styles from './TaskList.module.css';
import { FilterButton } from 'shared/ui-kit';
import { PRIORITY, STATUS } from '../model/types';

type TaskListProps = {
  tasks: TTask[];
  onClickTask?: (id: string, status: boolean) => void;
  onDeleteTask?: (id: string) => void;
};

export const TaskList: FC<TaskListProps> = memo(
  ({ tasks, onClickTask, onDeleteTask }) => {
    const [filter, setFilter] = useState({ priority: 'all', status: 'all' });

    const filteredTasks = useMemo(() => {
      const res =
        filter.priority === 'all'
          ? tasks
          : tasks.filter((task) => task.priority === filter.priority);

      return filter.status === 'all'
        ? res
        : filter.status === 'completed'
          ? tasks.filter((task) => task.completed)
          : tasks.filter((task) => !task.completed);
    }, [filter, tasks]);

    const onChangePriority = useCallback((priority: string) => {
      setFilter((prev) => ({ ...prev, priority }));
    }, []);

    const onChangeStatus = useCallback((status: string) => {
      setFilter((prev) => ({ ...prev, status }));
    }, []);

    const handleChangeTaskStatus = useCallback(
      (id: string, status: boolean) => {
        onClickTask?.(id, status);
      },
      [onClickTask]
    );

    return (
      <div className={styles.container}>
        <div className={styles.filters}>
          <FilterButton
            options={PRIORITY}
            defaultSelected='all'
            onChange={onChangePriority}
          />
          <FilterButton
            options={STATUS}
            defaultSelected='all'
            onChange={onChangeStatus}
          />
        </div>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={handleChangeTaskStatus}
            onDelete={onDeleteTask}
            status={task.completed}
          />
        ))}
      </div>
    );
  }
);
