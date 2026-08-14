import styles from './App.module.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RegistrationPage } from 'pages/users';
function App() {
  return (
    <div className={styles.container}>
      <Provider store={store}>
        <RegistrationPage />
        {/* <TaskPage /> */}
      </Provider>
    </div>
  );
}

export default App;
