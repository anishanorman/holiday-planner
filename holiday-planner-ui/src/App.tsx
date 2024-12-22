import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './Layout';
import { Create } from './pages/Create';
import { Dashboard } from './pages/Dashboard';
import { Edit } from './pages/Edit';
import { NotFound } from './pages/NotFound';
import { View } from './pages/View';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path='create' element={<Create />} />
					<Route path='edit/:id' element={<Edit />} />
					<Route path='view/:id' element={<View />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
