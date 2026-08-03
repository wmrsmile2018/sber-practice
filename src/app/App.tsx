import styles from './App.module.css';
import { TaskPage } from 'pages/tasks';
function App() {
  return (
    <div className={styles.container}>
      <TaskPage />
    </div>
  );
}

export default App;
