import { useNavigate } from 'react-router-dom';
import { useState, type ChangeEventHandler } from 'react';
import { useApiContext } from 'shared/context';
import { useAuthContext, type TAuthUserPresponse } from 'entities/user';
import { LoginApiConfig } from 'shared/api';
import { Button } from 'shared/ui-kit';

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
    <div>
      <h1>Вход в систему</h1>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          placeholder='Введите email'
          value={state.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='password'>Пароль</label>
        <input
          type='password'
          name='password'
          placeholder='Введите пароль'
          onChange={handleChange}
          value={state.password}
        />
      </div>

      <Button variant='primary' onClick={handleSubmit}>
        Войти
      </Button>

      <Button variant='secondary' onClick={handleClickPublic}>
        Публичная страница
      </Button>
    </div>
  );
};
