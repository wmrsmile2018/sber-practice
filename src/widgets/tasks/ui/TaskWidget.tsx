import { HOME_TASKS, PERSONAL_TASKS, WORK_TASKS } from 'entities/task';
import { TaskList, useTasks } from 'features/TaskList';
import { memo } from 'react';
import styles from './TaskWidget.module.css';

export const TaskWidget = memo(() => {
  const {
    tasks: workTasks,
    removeTask: removeWorkTasks,
    updateStatus: updatedWorkStatusTask,
  } = useTasks(WORK_TASKS);
  const {
    tasks: homeTasks,
    removeTask: removeHomeTasks,
    updateStatus: updateHomeStatusTask,
  } = useTasks(HOME_TASKS);
  const {
    tasks: personalTasks,
    removeTask: removePersonalTask,
    updateStatus: updatePersonalStatusTask,
  } = useTasks(PERSONAL_TASKS);

  return (
    <div className={styles.container}>
      <div>
        <p>Рабочие задачи</p>
        <TaskList
          tasks={workTasks}
          onDeleteTask={removeWorkTasks}
          onClickTask={updatedWorkStatusTask}
        />
      </div>
      <div>
        <p>Домашние задачи</p>
        <TaskList
          tasks={homeTasks}
          onDeleteTask={removeHomeTasks}
          onClickTask={updateHomeStatusTask}
        />
      </div>
      <div>
        <p>Личные задачи</p>
        <TaskList
          tasks={personalTasks}
          onDeleteTask={removePersonalTask}
          onClickTask={updatePersonalStatusTask}
        />
      </div>
    </div>
  );
});
