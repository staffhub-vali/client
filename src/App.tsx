import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EmployeesPage from './pages/EmployeesPage'
import SchedulesPage from './pages/SchedulesPage'
import DocumentationPage from './pages/DocumentationPage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import NewEmployeePage from './pages/NewEmployeePage'
import EmployeeProfilePage from './pages/EmployeeProfilePage'
import NewSchedulePage from './pages/NewSchedulePage'
import ScheduleDetailsPage from './pages/ScheduleDetailsPage'

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
						path='/employees/:id'
						element={<EmployeeProfilePage />}
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
						path='/schedules/:id'
						element={<ScheduleDetailsPage />}
					/>
					<Route
						path='/schedules/new'
						element={<NewSchedulePage />}
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
