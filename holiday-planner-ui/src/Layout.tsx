import { Outlet } from 'react-router';
import { Navbar } from './components/navbar/Navbar';

export const Layout = () => {
	return (
		<>
			<Navbar />
			<main className="grow">
				<Outlet />
			</main>
		</>
	);
};