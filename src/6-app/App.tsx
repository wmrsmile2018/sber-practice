import styles from './App.module.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './AppRouter';
import { ApiProvider } from 'shared/context';
import { AuthProvider } from 'entities/user';

function App() {
  return (
    <div className={styles.container}>
      <Provider store={store}>
        <ApiProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ApiProvider>
      </Provider>
    </div>
  );
}

export default App;
