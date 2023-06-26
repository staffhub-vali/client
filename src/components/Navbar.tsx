import { Logout } from '../Auth.tsx'
import { Link } from 'react-router-dom'
import { themeSwitch } from '../main.tsx'
import { useEffect, useState } from 'react'
import Button, { buttonVariants } from './ui/Button.tsx'
import { Menu } from 'lucide-react'

const Navbar = () => {
	const token = localStorage.getItem('token')
	const theme = localStorage.getItem('theme')
	const [sun, setSun] = useState<boolean>(true)
	const [moon, setMoon] = useState<boolean>(false)
	const [dropdown, showDropdown] = useState<boolean>(false)

	useEffect(() => {
		if (!theme) {
			setMoon(false)
			setSun(true)
		}
		if (theme === 'light') {
			setMoon(false)
			setSun(true)
		}
		if (theme === 'dark') {
			setMoon(true)
			setSun(false)
		}
	}, [])

	return (
		<div className=' navbar m-0 w-full select-none font-bold sm:fixed'>
			<div className='bg-white shadow dark:bg-slate-900 dark:text-slate-100'>
				<div className=' mx-auto px-4'>
					<div className='flex justify-around py-4 text-center'>
						<div className='flex items-center justify-between sm:w-36'>
							<Link
								to='/'
								className={`${buttonVariants({ variant: 'link' })} hidden min-w-0  font-semibold sm:flex `}>
								StaffHub
							</Link>
							{sun && (
								<Button
									variant={'link'}
									onClick={() => {
										themeSwitch()
										setMoon(true)
										setSun(false)
									}}
									className={`sm:scale-110`}>
									<svg
										className='h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 16 16'>
										<path d='M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z' />
									</svg>
								</Button>
							)}
							{moon && (
								<Button
									variant={'link'}
									onClick={() => {
										themeSwitch()
										setMoon(false)
										setSun(true)
									}}
									className={`sm:scale-110 `}>
									<svg
										className='h-5 w-5'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 16 16'>
										<path d='M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z' />
									</svg>
								</Button>
							)}
						</div>
						{token && (
							<div className='flex items-center space-x-4'>
								<Link
									to='/schedules/new'
									className={`${buttonVariants({ variant: 'link' })} hidden sm:flex sm:w-36`}>
									New Schedule
								</Link>
								<Link
									to='/employees'
									className={`${buttonVariants({ variant: 'link' })} hidden sm:flex sm:w-36`}>
									Employees
								</Link>
							</div>
						)}

						{token ? (
							<Link
								to={'/dashboard'}
								className={`${buttonVariants({ variant: 'outlineHover' })} hidden sm:flex sm:w-36`}>
								Dashboard
							</Link>
						) : (
							<Link
								to='/login'
								className={`${buttonVariants({ variant: 'outlineHover' })} hidden sm:flex sm:w-36`}>
								Sign In
							</Link>
						)}

						{token && (
							<Button
								variant={'link'}
								onClick={() => showDropdown(!dropdown)}
								className='flex	 cursor-pointer items-center sm:hidden'>
								<Menu />
							</Button>
						)}

						{!token && (
							<Link
								to='/login'
								className={`${buttonVariants({ variant: 'outlineHover' })} sm:hidden sm:w-36`}>
								Sign In
							</Link>
						)}
					</div>
				</div>
				{dropdown && (
					<div className='bg-white py-2 pl-4 text-lg dark:bg-slate-900 sm:hidden'>
						<div className='flex flex-col'>
							{token && (
								<>
									<Link
										to='/'
										onClick={() => showDropdown(false)}
										className=' py-2'>
										Homepage
									</Link>
									<Link
										to='/dashboard'
										onClick={() => showDropdown(false)}
										className=' py-2'>
										Dashboard
									</Link>
									<Link
										to='/employees'
										onClick={() => showDropdown(false)}
										className=' py-2'>
										Employees
									</Link>
									<Link
										to='/schedules/new'
										onClick={() => showDropdown(false)}
										className=' py-2'>
										New Schedule
									</Link>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar
