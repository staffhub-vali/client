import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../Auth'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
	const token = localStorage.getItem('token')
	const [mobile, setMobile] = useState(false)
	const user = localStorage.getItem('user') as Object
	return (
		<div className=' fixed m-0 w-full font-sans'>
			<div className='bg-white shadow'>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between py-4'>
						<Link
							to='/'
							className='p-3 text-sm font-semibold text-gray-800 hover:text-black active:scale-95'>
							Logo
						</Link>

						{token && (
							<div className=' hidden space-x-2 sm:flex sm:items-center'>
								<Link
									to='/employees'
									className='p-3 text-sm font-semibold text-gray-800 hover:text-black active:scale-95'>
									Employees
								</Link>
								<Link
									to='/schedules'
									className='p-3 text-sm font-semibold text-gray-800 hover:text-black active:scale-95'>
									Schedules
								</Link>
							</div>
						)}

						<div className='hidden sm:flex sm:items-center'>
							{user ? (
								<Link
									to={'/dashboard'}
									className='inline-block shrink-0 rounded border border-black bg-black px-5 py-3 text-sm font-medium text-white transition duration-150 hover:bg-transparent hover:text-black focus:outline-none active:scale-95'>
									Dashboard
								</Link>
							) : (
								<Link
									to='/auth/login'
									className='p-3 text-sm font-semibold text-gray-800 hover:text-black active:scale-95'>
									Sign In
								</Link>
							)}
						</div>

						<div
							onClick={() => setMobile(!mobile)}
							className='cursor-pointer sm:hidden'>
							x
						</div>
					</div>
					{mobile && (
						<div className='block border-t-2 bg-white py-2 sm:hidden'>
							<div className='flex flex-col'>
								{token && (
									<>
										<Link
											to='/dashboard'
											className='mr-4 py-2 text-sm font-bold text-gray-800 hover:text-black '>
											Dashboard
										</Link>
										<Link
											to='/employees'
											className=' border-t py-2 text-sm font-semibold text-gray-800 hover:text-black'>
											Employees
										</Link>
										<Link
											to='/schedules'
											className=' border-t py-2 text-sm font-semibold text-gray-800 hover:text-black'>
											Schedules
										</Link>
									</>
								)}
								{token ? (
									<Link
										to=''
										onClick={Logout}
										className='mr-4 border-t py-2 text-sm font-semibold text-gray-800 hover:text-black'>
										Sign Out
									</Link>
								) : (
									<Link
										to='/auth/login'
										className='mr-4 border-t py-2 text-sm font-semibold text-gray-800 hover:text-black'>
										Sign In
									</Link>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Navbar
