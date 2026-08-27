import './styles/normalize.css';
import './styles/styles.css';

import { Suspense } from 'react';
import { AppShell } from 'shared/ui/AppShell';
import { Header } from 'widgets/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from 'widgets/Footer';
import { Spinner } from 'shared/ui/Spinner';

export const App = () => {
  return (
    <AppShell>
      <Header />

      <div style={{ display: 'flex', flex: 1 }}>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </AppShell>
  );
};
