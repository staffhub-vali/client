import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EmployeesPage from './pages/EmployeesPage'
import SchedulesPage from './pages/SchedulesPage'
import DocumentationPage from './pages/DocumentationPage'
import AuthPage from './pages/AuthPage'

function App() {
	return (
		<div className='App min-h-screen overflow-x-hidden bg-slate-100 antialiased dark:bg-slate-800'>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path='/'
						element={<HomePage />}
					/>
					<Route
						path='/auth/:authForm'
						element={<AuthPage />}
					/>
					<Route
						path='/employees'
						element={<EmployeesPage />}
					/>
					<Route
						path='/schedules'
						element={<SchedulesPage />}
					/>
					<Route
						path='/docs'
						element={<DocumentationPage />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
