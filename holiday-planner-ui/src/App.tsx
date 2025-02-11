import { BrowserRouter, Route, Routes } from "react-router";
import { SnackbarProvider } from "./context/SnackbarContext";
import { Layout } from "./Layout";
import { Dashboard } from "./pages/Dashboard";
import { Edit } from "./pages/Edit";
import { NewHoliday } from "./pages/NewHoliday";
import { NotFound } from "./pages/NotFound";
import { View } from "./pages/View";

function App() {
	return (
		<SnackbarProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Dashboard />} />
							<Route path="holidays/new" element={<NewHoliday />} />
							<Route path="holidays/edit/:id" element={<Edit />} />
							<Route path="holidays/:holidayId" element={<View />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</BrowserRouter>
		</SnackbarProvider>
	);
}

export default App;
