import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui-kit';

export const PublicPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Публичная страница</h1>
      <p>Эта страница доступна всем пользователям без авторизации.</p>
      <Button variant='primary' onClick={() => navigate('/login')}>
        Войти
      </Button>
      <Button variant='secondary' onClick={() => navigate('/profile')}>
        Профиль
      </Button>
    </div>
  );
};
