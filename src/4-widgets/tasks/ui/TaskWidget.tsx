import { TaskList, useTasks } from 'features/TaskList';
import { memo } from 'react';
import styles from './TaskWidget.module.css';

export const TaskWidget = memo(() => {
  const {
    tasks: workTasks,
    removeTask: removeWorkTasks,
    updateStatus: updatedWorkStatusTask,
    setFilter: setWorkFilter,
    setPriority: setWorkPriority,
  } = useTasks();
  const {
    tasks: homeTasks,
    removeTask: removeHomeTasks,
    updateStatus: updateHomeStatusTask,
    setFilter: setHomeFilter,
    setPriority: setHomePriority,
  } = useTasks();
  const {
    tasks: personalTasks,
    removeTask: removePersonalTask,
    updateStatus: updatePersonalStatusTask,
    setFilter: setPersonalFilter,
    setPriority: setPersonalPriority,
  } = useTasks();

  return (
    <div className={styles.container}>
      <div>
        <p>Рабочие задачи</p>
        <TaskList
          tasks={workTasks}
          onDeleteTask={removeWorkTasks}
          onClickTask={updatedWorkStatusTask}
          onChangePriority={setWorkPriority}
          onChangeStatus={setWorkFilter}
        />
      </div>
      <div>
        <p>Домашние задачи</p>
        <TaskList
          tasks={homeTasks}
          onDeleteTask={removeHomeTasks}
          onClickTask={updateHomeStatusTask}
          onChangeStatus={setHomeFilter}
          onChangePriority={setHomePriority}
        />
      </div>
      <div>
        <p>Личные задачи</p>
        <TaskList
          tasks={personalTasks}
          onDeleteTask={removePersonalTask}
          onClickTask={updatePersonalStatusTask}
          onChangeStatus={setPersonalFilter}
          onChangePriority={setPersonalPriority}
        />
      </div>
    </div>
  );
});
