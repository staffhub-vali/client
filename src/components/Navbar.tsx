import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
	const [mobile, setMobile] = useState(false)
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

						<div className='hidden space-x-2 sm:flex sm:items-center'>
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
							<Link
								to='/docs'
								className='p-3 text-sm font-semibold text-gray-800 hover:text-black active:scale-95'>
								Documentation
							</Link>
						</div>

						<div className='hidden sm:flex sm:items-center'>
							<Link
								to='/auth/register'
								className='p-3 text-sm font-semibold text-gray-800 hover:text-black active:scale-95'>
								Sign Up
							</Link>
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
								<Link
									to='/employees'
									className='mb-1 text-sm font-semibold text-gray-800 hover:text-black'>
									Employees
								</Link>
								<Link
									to='/schedules'
									className='mb-1 text-sm font-semibold text-gray-800 hover:text-black'>
									Schedules
								</Link>
								<Link
									to='/docs'
									className='mb-1 text-sm font-semibold text-gray-800 hover:text-black'>
									Documentation
								</Link>

								<div className='flex items-center justify-between border-t-2 pt-2'>
									<Link
										to='/auth/register'
										className='mr-4 text-sm font-semibold text-gray-800 hover:text-black'>
										Sign Up
									</Link>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Navbar
