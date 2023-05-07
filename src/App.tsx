import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EmployeesPage from './pages/EmployeesPage'
import SchedulesPage from './pages/SchedulesPage'
import DocumentationPage from './pages/DocumentationPage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import NewEmployeePage from './pages/NewEmployeePage'

function App() {
	return (
		<div className='App min-h-screen overflow-x-hidden bg-slate-100 antialiased '>
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
						path='/dashboard'
						element={<DashboardPage />}
					/>
					<Route
						path='/employees'
						element={<EmployeesPage />}
					/>
					<Route
						path='/employees/new'
						element={<NewEmployeePage />}
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
