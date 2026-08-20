import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { useAuthContext } from 'entities/user';
import { useApiContext } from 'shared/context';

export const ProfilePage = () => {
  const { profile } = useAuthContext();
  const { logout } = useApiContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Профиль пользователя</h1>
      <div className={styles.profile}>
        <div className={styles.field}>
          <span className={styles.label}>ID:</span>
          <span className={styles.value}>{profile?.id}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{profile?.email}</span>
        </div>
      </div>
      <button className={styles.button} onClick={handleLogout}>
        Выйти
      </button>
    </div>
  );
};
