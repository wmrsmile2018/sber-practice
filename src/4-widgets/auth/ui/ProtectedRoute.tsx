import { Navigate, Outlet } from 'react-router-dom';
import { useApiContext } from 'shared/context';
import { useAuthContext } from 'entities/user';

export const ProtectedRoute = () => {
  const { isAuthorized } = useApiContext();
  const { isLoading } = useAuthContext();

  // Показываем загрузку пока восстанавливаем профиль пользователя
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return isAuthorized ? <Outlet /> : <Navigate to='/login' replace />;
};
