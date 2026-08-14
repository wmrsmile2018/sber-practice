import styles from './App.module.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RegistrationPage } from 'pages/users';
import { Form } from 'pages/wizard';
function App() {
  return (
    <div className={styles.container}>
      <Provider store={store}>
        <RegistrationPage />
        {/* <TaskPage /> */}
        <Form />
      </Provider>
    </div>
  );
}

export default App;
