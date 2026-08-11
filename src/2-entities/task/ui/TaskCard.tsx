import { memo, useCallback, type FC } from 'react';
import styles from './TaskCard.module.css';
import type { TTask } from '../model/types';
import type { ElementBaseCssProps } from 'shared/types';
import { RedioButton } from 'shared/ui-kit';
import {
  CloseIcon,
  HighPriorityIcon,
  LowPriorityIcon,
  MediumPriorityIcon,
} from 'shared/icons';

type TaskCardProps = ElementBaseCssProps & {
  task: TTask;
  onClick?: (id: string, status: boolean) => void;
  status?: boolean;
  onDelete?: (id: string) => void;
};

export const TaskCard: FC<TaskCardProps> = memo(
  ({ task, onClick, status, onDelete }) => {
    const onChangeStatus = useCallback(
      (status: boolean) => {
        onClick?.(task.id, status);
      },
      [task, onClick],
    );

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeftSide}>
            {onClick && (
              <RedioButton
                variant='rect'
                onChange={onChangeStatus}
                value={status}
              />
            )}
            <p>{task.id}</p>
          </div>
          {onDelete && (
            <div onClick={() => onDelete(task.id)}>
              <CloseIcon className={styles.closeIcon} />
            </div>
          )}
        </div>
        <div className={styles.content}>{task.title}</div>
        {task.priority && (
          <div className={styles.footer}>
            {task.priority === 'low' && <LowPriorityIcon />}
            {task.priority === 'high' && <HighPriorityIcon />}
            {task.priority === 'medium' && <MediumPriorityIcon />}
          </div>
        )}
      </div>
    );
  },
);
