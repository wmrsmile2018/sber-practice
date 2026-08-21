import './styles/normalize.css';
import './styles/styles.css';
import { Outlet } from 'react-router-dom';
import { Header } from '../4-widgets/Header';
import { Sort } from '../1-shared/ui/Sort';
import { Footer } from '../4-widgets/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
	return (
		<>
			<Header />
			<Sort />
			<Outlet />
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				pauseOnHover
				theme='colored'
			/>
			<Footer />
		</>
	);
};
