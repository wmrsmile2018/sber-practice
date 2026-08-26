import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PropsWithChildren } from 'react';

export const AppShell = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
