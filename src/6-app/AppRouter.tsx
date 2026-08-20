import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from 'widgets/auth';
import { PublicPage } from 'pages/public';
import { LoginPage, ProfilePage } from 'pages/users';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Защищённые маршруты */}
      <Route element={<ProtectedRoute />}>
        <Route path='/profile' element={<ProfilePage />} />
      </Route>

      {/* Публичные маршруты */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/public' element={<PublicPage />} />

      {/* Редирект по умолчанию */}
      <Route path='*' element={<Navigate to='/public' replace />} />
    </Routes>
  </BrowserRouter>
);
