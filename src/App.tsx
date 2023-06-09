import Navbar from './components/Navbar'
import AuthPage from './pages/Auth/AuthPage'
import HomePage from './pages/Home/HomePage'
import PageNotFound from './pages/PageNotFound'
import WorkDayPage from './pages/WorkDay/WorkDayPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import NewEmployeePage from './pages/Employee/NewEmployeePage'
import NewSchedulePage from './pages/Schedule/NewSchedulePage'
import DocumentationPage from './pages/Docs/DocumentationPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeesListPage from './pages/Employee/EmployeesListPage'
import EmployeeProfilePage from './pages/Employee/EmployeeProfilePage'

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
						element={<EmployeesListPage />}
					/>
					<Route
						path='/employees/:id'
						element={<EmployeeProfilePage />}
					/>
					<Route
						path='/employees/:id/:edit'
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
