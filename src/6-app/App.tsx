import styles from './App.module.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ClickTimer } from 'features/refExamples';
function App() {
  return (
    <div className={styles.container}>
      <Provider store={store}>
        <div>
          <ClickTimer />
        </div>
      </Provider>
    </div>
  );
}

export default App;
