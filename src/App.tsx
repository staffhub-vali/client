import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Spinner from './components/ui/Spinner'
import PageNotFound from './pages/PageNotFound'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/Home/HomePage'))
const AuthPage = lazy(() => import('./pages/Auth/AuthPage'))
const WorkDayPage = lazy(() => import('./pages/WorkDay/WorkDayPage'))
const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage'))
const NewEmployeePage = lazy(() => import('./pages/Employee/NewEmployeePage'))
const NewSchedulePage = lazy(() => import('./pages/Schedule/NewSchedulePage'))
const DocumentationPage = lazy(() => import('./pages/Docs/DocumentationPage'))
const EmployeesListPage = lazy(() => import('./pages/Employee/EmployeesListPage'))
const EmployeeProfilePage = lazy(() => import('./pages/Employee/EmployeeProfilePage'))

function App() {
	return (
		<div className='App min-h-screen overflow-x-hidden bg-slate-100 antialiased dark:bg-slate-800 '>
			<BrowserRouter>
				<Navbar />
				<Suspense
					fallback={
						<div className='mt-24 flex justify-center'>
							<Spinner />
						</div>
					}>
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
				</Suspense>
			</BrowserRouter>
		</div>
	)
}

export default App
