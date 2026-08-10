import { TaskCard, type TTask } from 'entities/task';
import { memo, useCallback, type FC } from 'react';
import styles from './TaskList.module.css';
import { FilterButton } from 'shared/ui-kit';
import { PRIORITY, STATUS, type Filter, type Priority } from '../model/types';

type TaskListProps = {
  tasks: TTask[];
  onClickTask?: (id: string, status: boolean) => void;
  onDeleteTask?: (id: string) => void;
  onChangePriority: (value: Priority) => void;
  onChangeStatus: (value: Filter) => void;
};

export const TaskList: FC<TaskListProps> = memo(
  ({ tasks, onClickTask, onDeleteTask, onChangePriority, onChangeStatus }) => {
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
        {tasks.map((task) => (
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
