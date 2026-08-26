import './styles/normalize.css';
import './styles/styles.css';
import { useSort } from 'features/sort/model/useSort';
import { ChangeEvent, Suspense } from 'react';
import { AppShell } from 'shared/ui/AppShell';
import { Header } from 'widgets/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from 'widgets/Footer';
import { Spinner } from 'shared/ui/Spinner';

export const App = () => {
  const { sort, setSort, sortParams } = useSort();
  const handleSortSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as Sort;
    setSort(newSort);
  };
  return (
    <AppShell>
      <Header />
      <select value={sort} onChange={handleSortSelect}>
        <select value={sort} onChange={handleSortSelect}>
          {sortParams.map((p) => (
            <option key={p.title} value={p.value}>
              {p.title}
            </option>
          ))}
        </select>
      </select>
      <div style={{ display: 'flex', flex: 1 }}>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </AppShell>
  );
};
