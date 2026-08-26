import { Outlet } from 'react-router-dom';
import { Header } from 'widgets/Header';
import { Footer } from 'widgets/Footer';
import { Sort } from 'shared/ui/Sort';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <Sort />
      <div style={{ display: 'flex', flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        theme='colored'
      />
    </>
  );
};
