import styles from './App.module.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ClickTimer, FocusTracker, PreviousInput } from 'features/refExamples';
function App() {
  return (
    <div className={styles.container}>
      <Provider store={store}>
        <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
          <ClickTimer />
          <PreviousInput />
          <FocusTracker />
        </div>
      </Provider>
    </div>
  );
}

export default App;
