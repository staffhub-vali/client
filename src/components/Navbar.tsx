import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../Auth'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
	const token = localStorage.getItem('token')
	const [mobile, setMobile] = useState(false)
	const user = localStorage.getItem('user') as Object
	return (
		<div className=' fixed m-0 w-full font-semibold'>
			<div className='bg-white shadow'>
				<div className='container mx-auto px-4'>
					<div className='flex justify-around py-4 text-center'>
						<Link
							to='/'
							className=' w-40 py-2   text-gray-800 hover:text-black active:scale-95'>
							Logo
						</Link>

						{user && (
							<div className='flex items-center space-x-4'>
								<Link
									to='/employees'
									className=' w-24 py-2    text-gray-800 hover:text-black active:scale-95'>
									Employees
								</Link>

								<Link
									to='/schedules'
									className=' w-24 py-2   text-gray-800 hover:text-black active:scale-95'>
									Schedules
								</Link>
							</div>
						)}

						{user ? (
							<Link
								to={'/dashboard'}
								className=' w-40 shrink-0 rounded border border-black bg-black py-2     text-white transition duration-150 hover:bg-transparent hover:text-black focus:outline-none active:scale-95'>
								Dashboard
							</Link>
						) : (
							<Link
								to='/auth/login'
								className=' w-44 py-2   text-gray-800 hover:text-black active:scale-95'>
								Sign In
							</Link>
						)}

						<div
							onClick={() => setMobile(!mobile)}
							className='cursor-pointer sm:hidden'>
							x
						</div>
					</div>
					{mobile && (
						<div className='block border-t-2 bg-white py-2 sm:hidden'>
							<div className='flex flex-col'>
								{user && (
									<>
										<Link
											to='/dashboard'
											className='mr-4 py-2 text-sm font-bold text-gray-800 hover:text-black '>
											Dashboard
										</Link>
										<Link
											to='/employees'
											className=' border-t  py-2 text-sm text-gray-800 hover:text-black'>
											Employees
										</Link>
										<Link
											to='/schedules'
											className=' border-t  py-2 text-sm text-gray-800 hover:text-black'>
											Schedules
										</Link>
									</>
								)}
								{user ? (
									<Link
										to=''
										onClick={Logout}
										className='mr-4  border-t py-2 text-sm text-gray-800 hover:text-black'>
										Sign Out
									</Link>
								) : (
									<Link
										to='/auth/login'
										className='mr-4  border-t py-2 text-sm text-gray-800 hover:text-black'>
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
