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

export const TaskList: FC<TaskListProps> = ({
  tasks,
  onClickTask,
  onDeleteTask,
}) => {
  const [filter, setFilter] = useState({ priority: 'all', status: 'all' });

  const res =
    filter.priority === 'all'
      ? tasks
      : tasks.filter((task) => task.priority === filter.priority);
  const filteredTasks =
    filter.status === 'all'
      ? res
      : filter.status === 'completed'
        ? res.filter((task) => task.completed)
        : res.filter((task) => !task.completed);

  const onChangePriority = (priority: string) => {
    setFilter((prev) => ({ ...prev, priority }));
  };

  const onChangeStatus = (status: string) => {
    setFilter((prev) => ({ ...prev, status }));
  };

  const handleChangeTaskStatus = (id: string, status: boolean) => {
    onClickTask?.(id, status);
  };

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
};
