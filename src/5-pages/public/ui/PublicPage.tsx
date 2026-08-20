import { useNavigate } from 'react-router-dom';
import styles from './PublicPage.module.css';

export const PublicPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Публичная страница</h1>
      <p className={styles.description}>
        Эта страница доступна всем пользователям без авторизации.
      </p>
      <button className={styles.authButton} onClick={() => navigate('/login')}>
        Войти
      </button>
    </div>
  );
};
