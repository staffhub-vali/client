import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar.tsx'
import Spinner from './components/ui/Spinner.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/Home/HomePage.tsx'))
const AuthPage = lazy(() => import('./pages/Auth/AuthPage.tsx'))
const WorkDayPage = lazy(() => import('./pages/WorkDay/WorkDayPage.tsx'))
const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage.tsx'))
const NewEmployeePage = lazy(() => import('./pages/Employee/NewEmployeePage.tsx'))
const NewSchedulePage = lazy(() => import('./pages/Schedule/NewSchedulePage.tsx'))
const DocumentationPage = lazy(() => import('./pages/Docs/DocumentationPage.tsx'))
const EmployeesListPage = lazy(() => import('./pages/Employee/EmployeesListPage.tsx'))
const EmployeeProfilePage = lazy(() => import('./pages/Employee/EmployeeProfilePage.tsx'))

import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<div className='min-h-screen overflow-x-hidden bg-slate-100 antialiased dark:bg-slate-800 '>
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
		</GoogleOAuthProvider>
	)
}

export default App
