import styles from './App.module.css';
import { TaskPage } from 'pages/tasks';
import { Provider } from 'react-redux';
import { store } from './store/store';
function App() {
  return (
    <div className={styles.container}>
      <Provider store={store}>
        <TaskPage />
      </Provider>
    </div>
  );
}

export default App;
