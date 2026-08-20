import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'entities/user';
import { useApiContext } from 'shared/context';
import { Button } from 'shared/ui-kit';

export const ProfilePage = () => {
  const { profile } = useAuthContext();
  const { logout } = useApiContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handlePublic = () => {
    navigate('/public');
  };

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <div>
        <span>ID:</span>
        <span>{profile?.id}</span>
      </div>
      <div>
        <span>Email:</span>
        <span>{profile?.email}</span>
      </div>
      <Button variant='primary' onClick={handleLogout}>
        Выйти
      </Button>
      <Button variant='secondary' onClick={handlePublic}>
        Публичная страница
      </Button>
    </div>
  );
};
