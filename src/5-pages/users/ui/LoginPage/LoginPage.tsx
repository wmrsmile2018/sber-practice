import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { useState, type ChangeEventHandler } from 'react';
import { useApiContext } from 'shared/context';
import { useAuthContext, type TAuthUserPresponse } from 'entities/user';
import { LoginApiConfig } from 'shared/api';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: 'admin@gmail.com',
    password: 'administrator',
  });
  const { mutateEntity } = useApiContext();

  const { setProfile } = useAuthContext();

  const handleChange: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = ({ target }) => {
    setState((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleClickPublic = () => {
    navigate('/public');
  };
  const handleSubmit = async () => {
    const { email, password } = state;
    const data = await mutateEntity<TAuthUserPresponse>(LoginApiConfig.path, {
      body: JSON.stringify({ email, password }),
    });
    setProfile(data.user, data.accessToken);
    navigate('/profile');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Вход в систему</h1>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='email'>
          Email
        </label>
        <input
          className={styles.input}
          name='email'
          placeholder='Введите email'
          value={state.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='password'>
          Пароль
        </label>
        <input
          className={styles.input}
          type='password'
          name='password'
          placeholder='Введите пароль'
          onChange={handleChange}
          value={state.password}
        />
      </div>

      <button className={styles.button} onClick={handleSubmit}>
        Войти
      </button>

      <button className={styles.button} onClick={handleClickPublic}>
        Публичная страница
      </button>
    </div>
  );
};
