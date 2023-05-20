import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import Navbar from './components/Navbar'
import WorkDayPage from './pages/WorkDayPage'
import PageNotFound from './pages/PageNotFound'
import DashboardPage from './pages/DashboardPage'
import EmployeesPage from './pages/EmployeesPage'
import NewEmployeePage from './pages/NewEmployeePage'
import NewSchedulePage from './pages/NewSchedulePage'
import DocumentationPage from './pages/DocumentationPage'
import EmployeeProfilePage from './pages/EmployeeProfilePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
	return (
		<div className='App min-h-screen overflow-x-hidden bg-slate-100 antialiased dark:bg-slate-800 '>
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
						path='/days/:id'
						element={<WorkDayPage />}
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
						path='/schedules/new'
						element={<NewSchedulePage />}
					/>
					<Route
						path='/docs'
						element={<DocumentationPage />}
					/>
					<Route
						path='*'
						element={<PageNotFound />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
