import { Navigate, Outlet } from 'react-router-dom';
import { useApiContext } from 'shared/context';

export const ProtectedRoute = () => {
  const { isAuthorized } = useApiContext();

  return isAuthorized ? <Outlet /> : <Navigate to='/login' replace />;
};
